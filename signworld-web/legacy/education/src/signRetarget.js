/**
 * signRetarget — drives a VRM humanoid from pose JSON v2
 * (produced by scripts/extract_vrm_poses.py).
 *
 * Everything is solved in WORLD space with the avatar facing +Z (toward the
 * camera), which is exactly the "avatar space" the extractor writes:
 *   +X = viewer's right, +Y = up, +Z = toward the viewer.
 *
 * Per arm:
 *   1. wrist target  = avatar face (eye level) + scaled frame.w
 *   2. two-bone IK (shoulder → elbow → wrist); the elbow swivel is chosen so
 *      the forearm follows the hand's pointing direction, biased downward
 *   3. hand orientation from the palm frame (wrist→middle MCP, pinky→index)
 *   4. every finger joint follows its landmark segment (minimal swing)
 * Presence weight `a` blends each arm with a relaxed rest pose, so the
 * phone-holding / off-screen hand hangs naturally instead of flailing.
 *
 * Rotations are handled as world-space "deltas" D (rotation away from the
 * rest pose). three-vrm's normalized bones have identity rest rotations, so
 *   local = Qroot⁻¹ · Dparent⁻¹ · D · Qroot
 * where Qroot is the normalized rig root's world rotation (π about Y for
 * VRM 0.x after VRMUtils.rotateVRM0, identity for VRM 1.0).
 */

const FINGERS = [
  // [VRM finger name, landmark chain (4 points → 3 segments)]
  ['Thumb',  [1, 2, 3, 4],     ['Metacarpal', 'Proximal', 'Distal']],
  ['Index',  [5, 6, 7, 8],     ['Proximal', 'Intermediate', 'Distal']],
  ['Middle', [9, 10, 11, 12],  ['Proximal', 'Intermediate', 'Distal']],
  ['Ring',   [13, 14, 15, 16], ['Proximal', 'Intermediate', 'Distal']],
  ['Little', [17, 18, 19, 20], ['Proximal', 'Intermediate', 'Distal']],
]

const HUMAN_EYE_HEIGHT = 1.62   // metres — used to scale signer space to the avatar
const HUMAN_EYE_TO_CHIN = 0.115   // must match EYE_TO_CHIN_M in the extractor

/**
 * Probe the face mesh with rays from the front: returns the z of the face
 * surface at eye level and the y of the chin, or nulls if the model has no
 * mesh named like "face".
 */
function measureFace(THREE, vrm, eye) {
  const meshes = []
  vrm.scene.traverse((o) => { if (o.isMesh && /face/i.test(o.name)) meshes.push(o) })
  if (!meshes.length) return { z: null, chinY: null }
  const ray = new THREE.Raycaster()
  const hitAt = (y) => {
    ray.set(new THREE.Vector3(eye.x, y, eye.z + 1), new THREE.Vector3(0, 0, -1))
    return ray.intersectObjects(meshes, false).find(h => h.point.z > eye.z - 0.05)
  }
  const front = hitAt(eye.y - 0.02)
  let chinY = null
  for (let y = eye.y - 0.03; y > eye.y - 0.3; y -= 0.004) {
    if (hitAt(y)) chinY = y
    else if (chinY !== null) break
  }
  return { z: front ? front.point.z : null, chinY }
}

export function createSignRig(THREE, vrm) {
  const { Vector3, Quaternion, Matrix4 } = THREE
  const humanoid = vrm.humanoid
  const node = (n) => humanoid.getNormalizedBoneNode(n)

  humanoid.resetNormalizedPose()
  vrm.scene.updateMatrixWorld(true)

  const rootQ = new Quaternion()
  humanoid.normalizedHumanBonesRoot.getWorldQuaternion(rootQ)
  const rootQInv = rootQ.clone().invert()

  const pos = (n) => {
    const b = node(n)
    return b ? b.getWorldPosition(new Vector3()) : null
  }

  // ---- rest measurements --------------------------------------------------
  const le = pos('leftEye'), re = pos('rightEye'), head = pos('head'), neck = pos('neck')
  const eyeAnchor = le && re
    ? le.clone().add(re).multiplyScalar(0.5)
    : head.clone().add(new Vector3(0, 0.07, 0))
  // Eye bones are pivots inside the head; the signer data is relative to the
  // face SURFACE, so push the anchor forward to where the face mesh is.
  const face = measureFace(THREE, vrm, eyeAnchor)
  eyeAnchor.z = face.z ?? eyeAnchor.z + (eyeAnchor.y - neck.y) * 0.6
  // Depth follows body size; on-screen x/y follow FACE size, so a hand at the
  // signer's chin lands on the avatar's chin even with stylised (big) heads.
  const groundY = vrm.scene.getWorldPosition(new Vector3()).y
  const scale = (eyeAnchor.y - groundY) / HUMAN_EYE_HEIGHT
  const faceH = face.chinY !== null ? eyeAnchor.y - face.chinY : HUMAN_EYE_TO_CHIN * scale
  const scaleXY = faceH / HUMAN_EYE_TO_CHIN

  function armInfo(side) {
    const p = side === 'right' ? 'right' : 'left'
    const S = pos(`${p}UpperArm`), E = pos(`${p}LowerArm`), H = pos(`${p}Hand`)
    const midP = pos(`${p}MiddleProximal`), idxP = pos(`${p}IndexProximal`), litP = pos(`${p}LittleProximal`)
    const info = {
      p, S,
      L1: S.distanceTo(E),
      L2: E.distanceTo(H),
      u0: E.clone().sub(S).normalize(),
      l0: H.clone().sub(E).normalize(),
      out: Math.sign(E.x - S.x) || (side === 'right' ? -1 : 1),   // lateral direction of this arm
      handFwd0: midP ? midP.clone().sub(H).normalize() : H.clone().sub(E).normalize(),
      handSide0: idxP && litP ? idxP.clone().sub(litP).normalize() : new Vector3(0, 0, 1),
      fingers: [],
    }
    for (const [fname, , segs] of FINGERS) {
      const names = segs.map(s => `${p}${fname}${s}`)
      const pts = names.map(pos)
      if (pts.some(v => !v)) continue
      const dirs = [
        pts[1].clone().sub(pts[0]).normalize(),
        pts[2].clone().sub(pts[1]).normalize(),
      ]
      dirs.push(dirs[1].clone())
      info.fingers.push({ fname, names, dirs })
    }
    return info
  }
  const arms = { R: armInfo('right'), L: armInfo('left') }

  // ---- math helpers -------------------------------------------------------
  const _m1 = new Matrix4(), _m2 = new Matrix4()
  const _a = new Vector3(), _b = new Vector3(), _c = new Vector3()

  /** rotation taking orthonormal frame (x0, y0) onto (x1, y1) */
  function frameDelta(x0, y0, x1, y1, out = new Quaternion()) {
    const z0 = new Vector3().crossVectors(x0, y0).normalize()
    const y0o = new Vector3().crossVectors(z0, x0).normalize()
    const z1 = new Vector3().crossVectors(x1, y1)
    if (z1.lengthSq() < 1e-10) return out.setFromUnitVectors(x0, x1)
    z1.normalize()
    const y1o = new Vector3().crossVectors(z1, x1).normalize()
    _m1.makeBasis(x0, y0o, z0)
    _m2.makeBasis(x1, y1o, z1)
    _m1.transpose()                     // inverse of an orthonormal basis
    return out.setFromRotationMatrix(_m2.multiply(_m1))
  }

  const perp = (v, axis) => v.clone().sub(axis.clone().multiplyScalar(v.dot(axis)))

  // ---- solve one arm → map of bone name → world delta quaternion ----------
  function solveArm(A, target, lm) {
    const D = {}
    const toT = target.clone().sub(A.S)
    let d = toT.length()
    const n = d > 1e-6 ? toT.divideScalar(d) : A.u0.clone()
    d = Math.min(Math.max(d, Math.abs(A.L1 - A.L2) + 1e-3), (A.L1 + A.L2) * 0.999)
    const T = A.S.clone().addScaledVector(n, d)

    // hand frame from landmarks
    let handFwd = null, handSide = null
    if (lm) {
      const P = (i) => _a.set(lm[i * 3], lm[i * 3 + 1], lm[i * 3 + 2]).clone()
      const wrist = P(0)
      handFwd = P(9).sub(wrist).normalize()
      handSide = P(5).sub(P(17)).normalize()
    }

    // elbow swivel: default hangs down / slightly out / back ...
    const poleDefault = new Vector3(A.out * 0.35, -1, -0.2).normalize()
    let pole = perp(poleDefault, n)
    // ... pulled toward where the forearm would sit if it followed the hand
    if (handFwd) {
      const want = T.clone().addScaledVector(handFwd, -A.L2).sub(A.S)
      const wp = perp(want, n)
      if (wp.lengthSq() > 1e-8) pole = pole.normalize().multiplyScalar(0.6).add(wp.normalize())
    }
    if (pole.lengthSq() < 1e-8) pole = perp(new Vector3(0, -1, 0), n)
    pole.normalize()
    if (pole.y > 0.3) { pole.y = 0.3; pole = perp(pole, n).normalize() }  // elbows don't point up

    const a = (A.L1 * A.L1 - A.L2 * A.L2 + d * d) / (2 * d)
    const h = Math.sqrt(Math.max(A.L1 * A.L1 - a * a, 0))
    const E = A.S.clone().addScaledVector(n, a).addScaledVector(pole, h)

    // upper arm: aim at elbow, twist so the elbow hinge contains the forearm
    const u = E.clone().sub(A.S).normalize()
    const fore = T.clone().sub(E).normalize()
    let f = perp(fore, u)
    if (f.lengthSq() < 1e-6) f = perp(pole.clone().negate(), u)
    f.normalize()
    const f0 = perp(new Vector3(0, 0, 1), A.u0).normalize()   // rest: elbow flexes forward
    D.UpperArm = frameDelta(A.u0, f0, u, f)

    // lower arm: pure hinge swing from where the upper arm left it
    const l0w = A.l0.clone().applyQuaternion(D.UpperArm)
    D.LowerArm = new Quaternion().setFromUnitVectors(l0w, fore).multiply(D.UpperArm)

    // hand
    if (handFwd) {
      D.Hand = frameDelta(A.handFwd0, A.handSide0, handFwd, handSide)
      // fingers: each segment follows its landmark direction
      for (const F of A.fingers) {
        const chain = FINGERS.find(x => x[0] === F.fname)[1]
        let parentD = D.Hand
        for (let s = 0; s < 3; s++) {
          const i0 = chain[s], i1 = chain[s + 1]
          const tgt = _b.set(lm[i1 * 3] - lm[i0 * 3], lm[i1 * 3 + 1] - lm[i0 * 3 + 1], lm[i1 * 3 + 2] - lm[i0 * 3 + 2])
          if (tgt.lengthSq() < 1e-10) { D[F.names[s]] = parentD.clone(); continue }
          tgt.normalize()
          const cur = _c.copy(F.dirs[s]).applyQuaternion(parentD)
          const q = new Quaternion().setFromUnitVectors(cur, tgt).multiply(parentD)
          D[F.names[s]] = q
          parentD = q
        }
      }
    } else {
      D.Hand = D.LowerArm.clone()
    }
    return D
  }

  // relaxed rest pose: arms hanging slightly forward, soft fingers
  function restArm(A) {
    const target = A.S.clone().add(new Vector3(A.out * 0.06, -(A.L1 + A.L2) * 0.93, 0.08))
    const D = solveArm(A, target, null)
    D.Hand = D.LowerArm.clone()
    const curl = new Quaternion()
    for (const F of A.fingers) {
      let parentD = D.Hand
      const axis = new Vector3().crossVectors(new Vector3(0, -1, 0), A.l0).normalize()
      for (let s = 0; s < 3; s++) {
        const ang = F.fname === 'Thumb' ? 0.1 : 0.25
        curl.setFromAxisAngle(axis.clone().applyQuaternion(parentD), ang * -A.out)
        const q = curl.clone().multiply(parentD)
        D[F.names[s]] = q
        parentD = q
      }
    }
    return D
  }
  const REST = { R: restArm(arms.R), L: restArm(arms.L) }

  // ---- apply --------------------------------------------------------------
  const ID = new Quaternion()
  const _t = new Vector3()

  function setLocal(name, worldD, parentWorldD) {
    const b = node(name)
    if (!b) return
    const l = parentWorldD.clone().invert().multiply(worldD)
    b.quaternion.copy(rootQInv).multiply(l).multiply(rootQ)
  }

  function applyArm(key, D) {
    const A = arms[key]
    const p = A.p
    setLocal(`${p}UpperArm`, D.UpperArm, ID)
    setLocal(`${p}LowerArm`, D.LowerArm, D.UpperArm)
    setLocal(`${p}Hand`, D.Hand, D.LowerArm)
    for (const F of A.fingers) {
      let parent = D.Hand
      for (const n of F.names) {
        const q = D[n] || parent
        setLocal(n, q, parent)
        parent = q
      }
    }
  }

  function blendD(Da, Db, w) {
    const out = {}
    for (const k of Object.keys(Da)) {
      out[k] = Db[k] ? Da[k].clone().slerp(Db[k], w) : Da[k].clone()
    }
    return out
  }

  function armFromSample(key, s) {
    if (!s || !(s.a > 0)) return REST[key]
    _t.set(s.w[0] * scaleXY, s.w[1] * scaleXY, s.w[2] * scale).add(eyeAnchor)
    const D = solveArm(arms[key], _t, s.p)
    return s.a >= 1 ? D : blendD(REST[key], D, s.a)
  }

  function lerpSample(a, b, t) {
    if (!a || !b) return t < 0.5 ? a : b
    const mix = (x, y) => x.map((v, i) => v + (y[i] - v) * t)
    return { w: mix(a.w, b.w), p: mix(a.p, b.p), a: a.a + (b.a - a.a) * t }
  }

  function applyHead(q) {
    const neckD = ID.clone().slerp(q, 0.4)
    setLocal('neck', neckD, ID)
    setLocal('head', q, neckD)
  }

  return {
    info: { eyeAnchor, scale, scaleXY, faceH },
    /** relaxed idle pose */
    rest() {
      applyArm('R', REST.R)
      applyArm('L', REST.L)
      applyHead(ID)
    },
    /** frames a, b from pose JSON v2, t ∈ [0,1] between them */
    apply(fa, fb, t) {
      applyArm('R', armFromSample('R', lerpSample(fa.R, fb.R, t)))
      applyArm('L', armFromSample('L', lerpSample(fa.L, fb.L, t)))
      if (fa.h && fb.h) {
        const qa = new Quaternion(...fa.h), qb = new Quaternion(...fb.h)
        applyHead(qa.slerp(qb, t))
      } else {
        applyHead(ID)
      }
    },
  }
}

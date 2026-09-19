/**
 * Avatar3D — VRM humanoid avatar powered by @pixiv/three-vrm.
 *
 * Loads public/avatar.vrm and replays per-sign motion (public/poses/{id}.json,
 * produced by scripts/extract_vrm_poses.py from the Isharah-Selfi videos):
 * wrist positions + full 21-point hand shapes + head rotation, retargeted onto
 * the avatar with IK in ../lib/signRetarget.js.
 *
 * The avatar is ALWAYS signing — there is no idle state.  `signId` is one clip
 * or a playlist (array); the playlist loops.  Playback runs at the source
 * video's frame rate (× `speed`) with a very short pause between clips.  The
 * avatar faces the viewer and mirrors the video exactly as it is seen.
 *
 * Caption:  string            → shown as is
 *           string[]          → caption[n % length] for the n-th clip played
 *           undefined         → the dataset sentence of the current clip (`lang`)
 */

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import { createSignRig } from '../lib/signRetarget'
import { signText } from '../lib/signs'

let THREE = null
let GLTFLoaderCls = null
let VRMLib = null

const FALLBACK = '00_0253'   // welcome sign, used when a requested clip is missing
const LOOP_PAUSE = 0.3   // seconds of rest pose between clips

// id -> pose JSON | null (loading) | false (failed); shared by every instance
const POSES = new Map()
function loadPose(id) {
  if (POSES.has(id)) return
  POSES.set(id, null)
  fetch(`/poses/${id}.json`)
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => POSES.set(id, d?.v === 2 && d.frames?.length ? d : false))
    .catch(() => POSES.set(id, false))
}

/** Frame the signing space (waist → above the head) for the container's aspect. */
function fitCamera(camera, vrm, aspect) {
  const h = vrm.humanoid
  const y = (n) => h.getNormalizedBoneNode(n).getWorldPosition(new THREE.Vector3()).y
  const top = y('head') + 0.24          // room for hands raised above the head
  const bottom = y('hips') + 0.08
  const halfW = 0.3                     // shoulders + hands reaching out
  const halfFov = THREE.MathUtils.degToRad(camera.fov / 2)
  const halfH = Math.max((top - bottom) / 2, halfW / aspect)
  const dist = halfH / Math.tan(halfFov)
  const cy = (top + bottom) / 2
  camera.aspect = aspect
  camera.position.set(0, cy, dist + 0.2)
  camera.lookAt(0, cy, 0)
  camera.updateProjectionMatrix()
}

export default function Avatar3D({
  signId = '00_0253',
  caption,
  lang = 'en',
  accent = 'var(--brand)',
  badgeLive = 'Signing',
  compact = false,
  speed = 1,
  paused = false,          // user-initiated freeze (e.g. a broadcast pause button)
  replayKey = 0,           // change it to restart the playlist from the first clip
}) {
  const mountRef = useRef(null)
  const ids = Array.isArray(signId) ? signId : [signId]
  const idsKey = ids.join(',')
  const stateRef = useRef({ ids, idsKey, speed, paused, replayKey })
  const [status, setStatus] = useState('loading')
  const [play, setPlay] = useState({ n: 0, id: null })   // n = clips played so far, id = clip now playing

  // Keep latest props without triggering Three.js re-init
  useEffect(() => {
    stateRef.current.ids = idsKey.split(',')
    stateRef.current.idsKey = idsKey
    stateRef.current.speed = speed
    stateRef.current.paused = paused
    stateRef.current.replayKey = replayKey
    idsKey.split(',').forEach(loadPose)
  }, [idsKey, speed, paused, replayKey])

  // Three.js / VRM setup — runs once on mount
  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const handle = { rafId: null, renderer: null, ro: null, disposed: false }

    ;(async () => {
      try {
        if (!THREE)         THREE = await import('three')
        if (!GLTFLoaderCls) GLTFLoaderCls = (await import('three/addons/loaders/GLTFLoader.js')).GLTFLoader
        if (!VRMLib)        VRMLib = await import('@pixiv/three-vrm')
        if (handle.disposed) return

        const W = container.clientWidth  || 300
        const H = container.clientHeight || 300

        const scene  = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(30, W / H, 0.01, 100)

        scene.add(new THREE.HemisphereLight(0xffffff, 0x555577, 1.2))
        const key = new THREE.DirectionalLight(0xffffff, 2.2)
        key.position.set(0.5, 2.0, 2.0)
        scene.add(key)
        const fill = new THREE.DirectionalLight(0xaaccff, 0.7)
        fill.position.set(-2.0, 0.5, 1.0)
        scene.add(fill)

        const loader = new GLTFLoaderCls()
        loader.crossOrigin = 'anonymous'
        loader.register((parser) => new VRMLib.VRMLoaderPlugin(parser))

        const gltf = await loader.loadAsync('/avatar.vrm')
        if (handle.disposed) return
        const vrm  = gltf.userData.vrm

        VRMLib.VRMUtils.removeUnnecessaryVertices(gltf.scene)
        VRMLib.VRMUtils.combineSkeletons(gltf.scene)
        VRMLib.VRMUtils.rotateVRM0(vrm)          // VRM 0.x faces −Z; turn it to face the camera
        vrm.scene.traverse((obj) => { obj.frustumCulled = false })
        scene.add(vrm.scene)

        const rig = createSignRig(THREE, vrm)
        fitCamera(camera, vrm, W / H)

        // Settle spring bones (hair, sleeves) in the rest pose before showing
        const settle = () => {
          vrm.humanoid.update()
          vrm.scene.updateMatrixWorld(true)
          vrm.springBoneManager?.reset()
        }
        rig.rest()
        settle()

        handle.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        handle.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        handle.renderer.setSize(W, H)
        handle.renderer.setClearColor(0x000000, 0)
        container.appendChild(handle.renderer.domElement)

        const clock = new THREE.Clock()
        let playingKey = null
        let clipIdx = 0
        let clipT = 0
        let started = false
        let played = 0
        let lastReplay = stateRef.current.replayKey
        setStatus('ready')

        function tick() {
          handle.rafId = requestAnimationFrame(tick)
          const delta = Math.min(clock.getDelta(), 0.1)
          const { ids: wanted, idsKey: key, speed: spd, paused: frozen, replayKey: replay } = stateRef.current

          // clips that failed to load are skipped; if none load, fall back to the welcome sign
          let list = wanted.filter((id) => POSES.get(id) !== false)
          if (!list.length) { list = [FALLBACK]; loadPose(FALLBACK) }
          const listKey = key + '|' + list.length
          if (lastReplay !== replay) { lastReplay = replay; playingKey = null }

          if (playingKey !== listKey) { playingKey = listKey; clipIdx = 0; clipT = 0; started = false }
          const pose = POSES.get(list[clipIdx % list.length])

          if (!pose) {
            rig.rest()          // still downloading the first clip
          } else {
            if (!started) {
              started = true
              played += 1
              setPlay({ n: played, id: list[clipIdx % list.length] })
            }
            if (!frozen) clipT += delta * (spd > 0 ? spd : 1)
            const n = pose.frames.length
            const clipDur = n / pose.fps
            if (clipT >= clipDur + LOOP_PAUSE) {
              clipIdx = (clipIdx + 1) % list.length
              clipT = 0
              started = false
            } else if (clipT >= clipDur) {
              rig.rest()
            } else {
              const f = clipT * pose.fps
              const i = Math.min(Math.floor(f), n - 1)
              rig.apply(pose.frames[i], pose.frames[Math.min(i + 1, n - 1)], f - i)
            }
          }

          // Node constraints (twist / sleeve helpers) read world matrices, so
          // refresh them before vrm.update() runs the constraints + springs.
          vrm.humanoid.update()
          vrm.scene.updateMatrixWorld(true)
          vrm.update(delta)
          handle.renderer.render(scene, camera)
        }
        tick()

        handle.ro = new ResizeObserver(() => {
          const cw = container.clientWidth
          const ch = container.clientHeight
          if (cw && ch) {
            handle.renderer.setSize(cw, ch)
            fitCamera(camera, vrm, cw / ch)
          }
        })
        handle.ro.observe(container)

      } catch (err) {
        console.error('[Avatar3D] load error:', err)
        setStatus('error')
      }
    })()

    return () => {
      handle.disposed = true
      cancelAnimationFrame(handle.rafId)
      handle.ro?.disconnect()
      if (handle.renderer) {
        handle.renderer.dispose()
        if (container.contains(handle.renderer.domElement)) {
          container.removeChild(handle.renderer.domElement)
        }
      }
    }
  }, [])

  const shown = Array.isArray(caption)
    ? caption[Math.max(play.n - 1, 0) % caption.length] ?? ''
    : caption ?? signText(play.id ?? ids[0], lang)

  return (
    <div
      className={`avatar-stage ${compact ? 'avatar-stage--compact' : ''}`}
      style={{ '--accent': accent }}
    >
      <div className="avatar-stage__ring" aria-hidden="true" />

      <div
        ref={mountRef}
        className="avatar-stage__figure"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {status !== 'ready' && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0.35,
          }}>
            <Icon name="avatar" size={48} />
          </div>
        )}
      </div>

      <span className="avatar-stage__badge is-live">
        <Icon name="avatar" size={13} />
        {badgeLive}
      </span>

      <AnimatePresence mode="wait">
        {shown && (
          <motion.p
            key={shown}
            className="avatar-stage__caption"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {shown}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

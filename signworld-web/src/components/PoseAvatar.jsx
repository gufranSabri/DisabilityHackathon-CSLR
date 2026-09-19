import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'

// ---------------------------------------------------------------------------
// Pose86K keypoint layout (same as models/Pose86K-CSLR-Isharah/utils/datasetv2.py)
//   [0:21]  right hand  (MediaPipe Hands)
//   [21:42] left hand   (MediaPipe Hands)
//   [42:61] lips        (19 FaceMesh pts, sorted by global ID)
//   [61:86] body        (25 BlazePose pts, POSE_25_INDICES subset)
//
// Coordinates are pre-normalised to [0,1] by extract_sign_poses.py.
// (0,0) = occluded / not detected — skipped when drawing.
// ---------------------------------------------------------------------------

// Hand edges (local 0-20) — MediaPipe Hands topology
const HAND_EDGES_LOCAL = [
  [0,1],[1,2],[2,3],[3,4],
  [0,5],[5,6],[6,7],[7,8],
  [0,9],[9,10],[10,11],[11,12],
  [0,13],[13,14],[14,15],[15,16],
  [0,17],[17,18],[18,19],[19,20],
]
// Right hand (base 0), Left hand (base 21)
const RIGHT_HAND_EDGES = HAND_EDGES_LOCAL.map(([a, b]) => [a, b])
const LEFT_HAND_EDGES  = HAND_EDGES_LOCAL.map(([a, b]) => [a + 21, b + 21])

// Body edges — BlazePose 25-of-33 subset (POSE_25_INDICES), local 0-24 → global +61
// POSE_25_INDICES = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,23,24,25,26,27,28,29,30]
// local idx map: global→local  23→17,24→18,25→19,26→20,27→21,28→22,29→23,30→24
const BODY_EDGES = [
  [0,1],[1,2],[2,3],[3,7],
  [0,4],[4,5],[5,6],[6,8],
  [9,10],
  [11,12],[11,13],[13,15],[12,14],[14,16],
  [11,17],[12,18],[17,18],
  [17,19],[19,21],[21,23],
  [18,20],[20,22],[22,24],
].map(([a, b]) => [61 + a, 61 + b])

// Wrist links: body right wrist (61+15=76) ↔ rh wrist (0), body left wrist (61+16=77) ↔ lh wrist (21)
const WRIST_EDGES = [[76, 0], [77, 21]]

// Lips edges (local 0-18, offset +42 in global)
// Global IDs sorted: [0,17,37,39,40,61,84,91,146,181,185,267,269,270,291,314,321,375,405]
// g2l: 0→0,17→1,37→2,39→3,40→4,61→5,84→6,91→7,146→8,181→9,185→10,267→11,269→12,270→13,291→14,314→15,321→16,375→17,405→18
// upper path [61,185,40,39,37,0,267,269,270,291] → local [5,10,4,3,2,0,11,12,13,14]
// lower path [146,91,181,84,17,314,405,321,375,291] → local [8,7,9,6,1,15,18,16,17,14]
const _UPPER = [5,10,4,3,2,0,11,12,13,14]
const _LOWER = [8,7,9,6,1,15,18,16,17,14]
const LIPS_EDGES = [
  ..._UPPER.slice(0, -1).map((a, i) => [42 + a, 42 + _UPPER[i + 1]]),
  ..._LOWER.slice(0, -1).map((a, i) => [42 + a, 42 + _LOWER[i + 1]]),
]

const ALL_EDGES = [...BODY_EDGES, ...RIGHT_HAND_EDGES, ...LEFT_HAND_EDGES, ...LIPS_EDGES, ...WRIST_EDGES]

// Color scheme (matches render_pose_to_images.py)
const COLORS = {
  body:  '#ffb43c',
  rhand: '#3cc800',
  lhand: '#b45aff',
  lips:  '#ffdc00',
}

function edgeColor(a) {
  if (a < 21)  return COLORS.rhand
  if (a < 42)  return COLORS.lhand
  if (a < 61)  return COLORS.lips
  return COLORS.body
}

function drawFrame(ctx, pts, W, H) {
  ctx.clearRect(0, 0, W, H)

  const px = (x) => x * W
  const py = (y) => y * H

  const valid = (i) => pts[i][0] !== 0 || pts[i][1] !== 0

  // Edges
  for (const [a, b] of ALL_EDGES) {
    if (!valid(a) || !valid(b)) continue
    ctx.beginPath()
    ctx.moveTo(px(pts[a][0]), py(pts[a][1]))
    ctx.lineTo(px(pts[b][0]), py(pts[b][1]))
    ctx.strokeStyle = edgeColor(a)
    ctx.lineWidth = a >= 61 ? 2.5 : 1.5
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  // Joints
  for (let i = 0; i < pts.length; i++) {
    if (!valid(i)) continue
    ctx.beginPath()
    ctx.arc(px(pts[i][0]), py(pts[i][1]), i >= 61 ? 3.5 : 2, 0, Math.PI * 2)
    ctx.fillStyle = edgeColor(i)
    ctx.fill()
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PoseAvatar({
  signId = '00_0253',
  signing = false,
  caption = '',
  accent = 'var(--brand)',
  badgeIdle = 'Idle',
  badgeLive = 'Signing',
  compact = false,
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const poseRef = useRef(null)   // { fps, frames }
  const frameRef = useRef(0)
  const lastTRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Load pose JSON
  useEffect(() => {
    let cancelled = false
    setLoaded(false)
    setError(false)
    poseRef.current = null
    frameRef.current = 0
    lastTRef.current = null

    fetch(`/poses/${signId}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status)
        return r.json()
      })
      .then((data) => {
        if (!cancelled) {
          poseRef.current = data
          setLoaded(true)
        }
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })

    return () => { cancelled = true }
  }, [signId])

  // Animation loop
  const animate = useCallback((ts) => {
    const canvas = canvasRef.current
    const pose = poseRef.current
    if (!canvas || !pose) return

    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

    if (!signing) {
      // Draw idle: first frame
      drawFrame(ctx, pose.frames[0], W, H)
      return
    }

    const mspf = 1000 / pose.fps
    if (lastTRef.current === null) lastTRef.current = ts

    const elapsed = ts - lastTRef.current
    if (elapsed >= mspf) {
      frameRef.current = (frameRef.current + Math.floor(elapsed / mspf)) % pose.frames.length
      lastTRef.current = ts
    }

    drawFrame(ctx, pose.frames[frameRef.current], W, H)
    rafRef.current = requestAnimationFrame(animate)
  }, [signing])

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    if (!loaded) return
    if (signing) {
      frameRef.current = 0
      lastTRef.current = null
      rafRef.current = requestAnimationFrame(animate)
    } else {
      // Draw idle frame once
      rafRef.current = requestAnimationFrame(animate)
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [loaded, signing, animate])

  return (
    <div
      className={`avatar-stage ${compact ? 'avatar-stage--compact' : ''}`}
      style={{ '--accent': accent }}
    >
      <div className="avatar-stage__ring" aria-hidden="true" />

      <motion.div
        className="avatar-stage__figure"
        animate={signing ? { y: [0, -3, 0] } : { y: [0, -4, 0] }}
        transition={{ duration: signing ? 1.6 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="avatar-stage__peep" style={{ background: 'var(--accent, var(--brand))', borderRadius: 16, overflow: 'hidden' }}>
          {error ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', opacity: 0.4 }}>
              <Icon name="avatar" size={48} />
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          )}
        </div>
      </motion.div>

      <span className={`avatar-stage__badge ${signing ? 'is-live' : ''}`}>
        <Icon name="avatar" size={13} />
        {signing ? badgeLive : badgeIdle}
      </span>

      <AnimatePresence mode="wait">
        {caption && (
          <motion.p
            key={caption}
            className="avatar-stage__caption"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {caption}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

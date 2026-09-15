import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Peep from 'react-peeps'
import Icon from '../Icons'

// A proper illustrated character (Open Peeps, CC0/MIT via react-peeps) standing
// in for a signing avatar. Each Peep pose is one hand-drawn full-body SVG, not
// a jointed rig, so it can't be bent/animated limb-by-limb - instead we
// crossfade between a curated set of gesture-like poses while `signing`, with
// a gentle idle bob otherwise. `caption` can be a string or array of gloss
// tokens; array is stepped through per token. This is a legible stand-in for
// what a signing avatar would look like, not real signed content.
const POSES = ['Explaining', 'PointingFingerBW', 'RoboDanceWB', 'PointingUp']

const PEEP_PROPS = {
  face: 'SmileNM',
  hair: 'Short',
  strokeColor: '#2b2b2b',
  backgroundColor: 'var(--accent)',
}

export default function AvatarStage({
  signing = false,
  caption = '',
  speed = 1,
  accent = 'var(--brand)',
  badgeIdle = 'Idle',
  badgeLive = 'Signing',
  compact = false,
  tokenDurationMs = 500,
}) {
  const [poseIndex, setPoseIndex] = useState(0)
  const [currentCaption, setCurrentCaption] = useState('')
  const [glossIndex, setGlossIndex] = useState(0)
  const poseDurationMs = 2000 / Math.max(0.4, speed)

  useEffect(() => {
    if (!signing) return
    setPoseIndex(0)
    const id = setInterval(() => {
      setPoseIndex((i) => (i + 1) % POSES.length)
    }, poseDurationMs)
    return () => clearInterval(id)
  }, [signing, poseDurationMs])

  useEffect(() => {
    if (!signing || !Array.isArray(caption) || caption.length === 0) {
      if (typeof caption === 'string') {
        setCurrentCaption(caption)
      } else {
        setCurrentCaption('')
      }
      return
    }

    if (glossIndex >= caption.length) {
      setGlossIndex(0)
      setCurrentCaption('')
      return
    }

    setCurrentCaption(caption[glossIndex])
    const timer = setTimeout(() => setGlossIndex(glossIndex + 1), tokenDurationMs)
    return () => clearTimeout(timer)
  }, [signing, caption, glossIndex, tokenDurationMs])

  const displayCaption = Array.isArray(caption) ? currentCaption : caption
  const pose = signing ? POSES[poseIndex] : 'RestingBW'

  return (
    <div className={`avatar-stage ${compact ? 'avatar-stage--compact' : ''}`} style={{ '--accent': accent }}>
      <div className="avatar-stage__ring" aria-hidden="true" />
      <motion.div
        className="avatar-stage__figure"
        animate={signing ? { y: [0, -3, 0] } : { y: [0, -4, 0] }}
        transition={{ duration: signing ? 1.6 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pose}
            className="avatar-stage__peep"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <Peep body={pose} {...PEEP_PROPS} viewBox={{ x: '0', y: '150', width: '850', height: '1050' }} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <span className={`avatar-stage__badge ${signing ? 'is-live' : ''}`}>
        <Icon name="avatar" size={13} />
        {signing ? badgeLive : badgeIdle}
      </span>

      <AnimatePresence mode="wait">
        {displayCaption && (
          <motion.p
            key={displayCaption}
            className="avatar-stage__caption"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {displayCaption}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

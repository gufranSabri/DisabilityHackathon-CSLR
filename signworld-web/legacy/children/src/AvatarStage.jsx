import { motion } from 'framer-motion'
import Icon from './Icons'

// Stand-in for the Brain's Text/Speech -> Sign output: a stylized signing
// silhouette, here framed as a friendly mascot companion. `signing` toggles
// between a bouncy idle loop and a faster "signing" gesture cycle, driven by
// dummy state upstream. When `emoji` is given (a chosen mascot), it renders
// as the mascot's face instead of a plain circle head.
export default function AvatarStage({ signing = false, caption = '', idleLabel, liveLabel, accent = 'var(--accent-soft)', emoji }) {
  return (
    <div className="avatar-stage" style={{ '--accent': accent }}>
      <div className="avatar-stage__ring" aria-hidden="true" />
      <motion.div
        className="avatar-stage__figure"
        animate={signing ? { y: [0, -4, 0], rotate: [0, -2, 2, 0] } : { y: [0, -7, 0] }}
        transition={{ duration: signing ? 0.8 : 2.1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 130" width="100%" height="100%" aria-hidden="true">
          <path d="M50 40c-16 0-27 12-27 30v40c0 6 5 10 12 10h30c7 0 12-4 12-10V70c0-18-11-30-27-30Z" fill="var(--accent)" opacity="0.5" />
          {!emoji && <circle cx="50" cy="24" r="16" fill="var(--accent)" />}

          <motion.g
            style={{ originX: '27px', originY: '62px' }}
            animate={signing ? { rotate: [0, -34, 6, -34, 0] } : { rotate: -18 }}
            transition={signing ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } : { type: 'spring', bounce: 0.55, duration: 0.6 }}
          >
            <line x1="27" y1="62" x2="10" y2="46" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" />
            <circle cx="10" cy="46" r="4.5" fill="var(--accent)" />
          </motion.g>

          <motion.g
            style={{ originX: '73px', originY: '62px' }}
            animate={signing ? { rotate: [0, 34, -6, 34, 0] } : { rotate: 18 }}
            transition={signing ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.1 } : { type: 'spring', bounce: 0.55, duration: 0.6 }}
          >
            <line x1="73" y1="62" x2="90" y2="46" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" />
            <circle cx="90" cy="46" r="4.5" fill="var(--accent)" />
          </motion.g>
        </svg>

        {emoji && (
          <motion.span
            className="avatar-stage__face"
            animate={signing ? { scale: [1, 1.08, 1] } : { scale: [1, 1.04, 1] }}
            transition={{ duration: signing ? 0.8 : 2.1, repeat: Infinity, ease: 'easeInOut' }}
          >
            {emoji}
          </motion.span>
        )}
      </motion.div>

      <span className={`avatar-stage__badge ${signing ? 'is-live' : ''}`}>
        <Icon name="avatar" size={13} />
        {signing ? (liveLabel ?? 'يُشير الآن · Signing') : (idleLabel ?? 'جاهز · Idle')}
      </span>

      {caption && (
        <motion.p
          key={caption}
          className="avatar-stage__caption"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {caption}
        </motion.p>
      )}
    </div>
  )
}

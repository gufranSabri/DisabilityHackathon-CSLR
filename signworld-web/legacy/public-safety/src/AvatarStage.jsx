import { motion } from 'framer-motion'
import Icon from './Icons'

// Stand-in for the Brain's Text/Speech -> Sign output: a stylized signing
// silhouette. `signing` toggles between an idle breathing loop and a
// faster "signing" gesture cycle, driven by dummy state upstream.
export default function AvatarStage({ signing = false, caption = '', accent = 'var(--flag-soft)' }) {
  return (
    <div className="avatar-stage" style={{ '--accent': accent }}>
      <div className="avatar-stage__ring" aria-hidden="true" />
      <motion.div
        className="avatar-stage__figure"
        animate={signing ? { y: [0, -2, 0] } : { y: [0, -4, 0] }}
        transition={{ duration: signing ? 1.1 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 130" width="100%" height="100%" aria-hidden="true">
          <path d="M50 40c-16 0-27 12-27 30v40c0 6 5 10 12 10h30c7 0 12-4 12-10V70c0-18-11-30-27-30Z" fill="var(--accent)" opacity="0.5" />
          <circle cx="50" cy="24" r="16" fill="var(--accent)" />

          <motion.g
            style={{ originX: '27px', originY: '62px' }}
            animate={signing ? { rotate: [0, -34, 6, -34, 0] } : { rotate: -18 }}
            transition={signing ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.6 }}
          >
            <line x1="27" y1="62" x2="10" y2="46" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" />
            <circle cx="10" cy="46" r="4.5" fill="var(--accent)" />
          </motion.g>

          <motion.g
            style={{ originX: '73px', originY: '62px' }}
            animate={signing ? { rotate: [0, 34, -6, 34, 0] } : { rotate: 18 }}
            transition={signing ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.12 } : { duration: 0.6 }}
          >
            <line x1="73" y1="62" x2="90" y2="46" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" />
            <circle cx="90" cy="46" r="4.5" fill="var(--accent)" />
          </motion.g>
        </svg>
      </motion.div>

      <span className={`avatar-stage__badge ${signing ? 'is-live' : ''}`}>
        <Icon name="avatar" size={13} />
        {signing ? 'يُترجم الآن · Signing' : 'جاهز · Idle'}
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

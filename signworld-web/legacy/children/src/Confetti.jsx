import { motion } from 'framer-motion'

const COLORS = ['#f5a30f', '#ef5f4c', '#0fada0', '#8a5cf6', '#52b955', '#ffcc4d']

// A short-lived confetti burst, mounted on demand (e.g. `{show && <Confetti />}`
// inside an AnimatePresence) to celebrate a correct answer or unlocked badge.
export default function Confetti({ count = 26 }) {
  const pieces = Array.from({ length: count }, (_, i) => {
    const left = 4 + ((i * 37) % 92)
    const color = COLORS[i % COLORS.length]
    const size = 6 + (i % 4) * 2
    const delay = (i % 7) * 0.03
    const duration = 1.1 + (i % 5) * 0.18
    const drift = ((i % 2 === 0 ? 1 : -1) * (20 + (i % 6) * 10))
    const rotate = 180 + (i % 6) * 60
    const round = i % 3 === 0
    return (
      <motion.span
        key={i}
        className="confetti-piece"
        style={{
          left: `${left}%`,
          width: size,
          height: round ? size : size * 1.6,
          background: color,
          borderRadius: round ? '50%' : 2,
        }}
        initial={{ y: -20, x: 0, opacity: 1, rotate: 0 }}
        animate={{ y: '110vh', x: drift, opacity: [1, 1, 0], rotate }}
        transition={{ duration, delay, ease: [0.2, 0.6, 0.4, 1] }}
      />
    )
  })

  return <div className="confetti-layer" aria-hidden="true">{pieces}</div>
}

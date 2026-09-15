import { motion } from 'framer-motion'
import Icon from './Icons'

// A stylized CAD-style grid map: the caller's location pin at center plus a
// few responder units positioned around it with a live ETA badge. Purely
// cosmetic — coordinates are fixed percentages, not real geodata.
export default function IncidentMap({ label, eta, units = [] }) {
  return (
    <div className="incmap">
      <div className="incmap__grid" aria-hidden="true" />

      {units.map((u, i) => (
        <motion.div
          key={u.id}
          className="incmap__unit"
          style={{ left: `${u.x}%`, top: `${u.y}%`, '--unit-color': u.color }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
        >
          <Icon name={u.icon} size={11} />
        </motion.div>
      ))}

      <div className="incmap__pin" style={{ left: '50%', top: '50%' }}>
        <motion.span
          className="incmap__pin-pulse"
          animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
        <span className="incmap__pin-dot" />
      </div>

      <span className="incmap__label">{label}</span>
      {eta && <span className="incmap__eta">ETA {eta}</span>}
    </div>
  )
}

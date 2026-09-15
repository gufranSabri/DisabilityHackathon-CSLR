import { motion } from 'framer-motion'
import Icon from '../Icons'

// Floating SOS pill, sits just above the tab bar on every screen.
export default function SosPill({ label, onClick }) {
  return (
    <motion.button
      className="sospill"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring', bounce: 0.3 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="sospill__pulse" aria-hidden="true" />
      <Icon name="sos" size={16} />
      {label}
    </motion.button>
  )
}

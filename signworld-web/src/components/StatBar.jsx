import { motion } from 'framer-motion'
import { useL } from '../useLangCtx'
import { IMPACT } from '../content'

export default function StatBar({ items = IMPACT }) {
  const { lang } = useL()
  return (
    <div className="statbar">
      {items.map((s, i) => (
        <motion.div
          key={s.label[lang]}
          className="statbar__tile"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
        >
          <span className="statbar__value">{s.value}</span>
          <span className="statbar__label">{s.label[lang]}</span>
        </motion.div>
      ))}
    </div>
  )
}

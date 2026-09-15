import { motion } from 'framer-motion'

export function Section({ children, className = '', tint = false, id }) {
  return (
    <section id={id} className={`section ${tint ? 'section--tint' : ''} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, sub, center = false }) {
  return (
    <motion.div
      className={`sechead ${center ? 'sechead--center' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && <p className="sechead__eyebrow">{eyebrow}</p>}
      <h2 className="sechead__title">{title}</h2>
      {sub && <p className="sechead__sub">{sub}</p>}
    </motion.div>
  )
}

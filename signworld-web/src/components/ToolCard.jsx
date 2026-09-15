import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'

export default function ToolCard({ tool, index = 0 }) {
  const { lang, t } = useL()
  const [open, setOpen] = useState(false)
  const d = t.directory

  const badge =
    tool.kind === 'app' ? d.appBadge
    : tool.kind === 'gov' ? d.govBadge
    : d.resourceBadge

  return (
    <motion.div
      className="toolcard"
      style={{ '--accent': tool.accent }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div className="toolcard__top">
        <span className="toolcard__icon"><Icon name={tool.icon} size={20} /></span>
        <span className={`toolcard__badge toolcard__badge--${tool.kind}`}>{badge}</span>
      </div>
      <h3 className="toolcard__name">{tool.name[lang]}</h3>
      <p className="toolcard__tagline">{tool.tagline[lang]}</p>
      <p className="toolcard__body">{tool.body[lang]}</p>

      {tool.kind === 'app' && tool.route && (
        <Link className="toolcard__cta" to={tool.route}>
          {d.openApp} <Icon name="arrowUpRight" size={13} />
        </Link>
      )}

      {tool.kind === 'app' && !tool.route && tool.href && (
        <a className="toolcard__cta" href={tool.href} target="_blank" rel="noreferrer">
          {d.openApp} <Icon name="arrowUpRight" size={13} />
        </a>
      )}

      {tool.kind === 'gov' && tool.explainer && (
        <>
          <button className="toolcard__cta toolcard__cta--ghost" onClick={() => setOpen((o) => !o)}>
            {d.howHelps} <Icon name={open ? 'minus' : 'plus'} size={13} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.p
                className="toolcard__explainer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {tool.explainer[lang]}
              </motion.p>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'

export default function AppCard({ app, index = 0, large = false }) {
  const { lang, dir, t } = useL()
  const arrow = dir === 'rtl' ? 'arrowLeft' : 'arrowRight'

  return (
    <motion.div
      className={`appcard ${large ? 'appcard--large' : ''}`}
      style={{ '--accent': app.accent }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {large && (
        <div className="appcard__shot">
          <img src={`/shots/${app.id}.svg`} alt="" loading="lazy" />
        </div>
      )}
      <div className="appcard__body">
        <span className="appcard__icon"><Icon name={app.icon} size={22} /></span>
        <h3 className="appcard__name">{app.name[lang]}</h3>
        <p className="appcard__tagline">{app.tagline[lang]}</p>
        <div className="appcard__actions">
          <Link className="btn btn--primary btn--sm" to={`/apps/${app.id}/open`}>
            {t.apps.openApp} <Icon name={arrow} size={13} />
          </Link>
          <Link className="btn btn--ghost btn--sm" to={`/apps/${app.id}`}>
            {t.apps.details} <Icon name={arrow} size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

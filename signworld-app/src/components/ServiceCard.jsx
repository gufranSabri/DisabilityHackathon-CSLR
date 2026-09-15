import { motion } from 'framer-motion'
import Icon from '../Icons'

// One service in the catalog / situation lists.
export default function ServiceCard({ service, lang, dir, t, isSaved, onToggleSave, onOpen, index = 0 }) {
  const badge =
    service.kind === 'app' ? t.common.appBadge
    : service.kind === 'gov' ? t.common.govBadge
    : t.common.resourceBadge

  const arrow = dir === 'rtl' ? 'arrowLeft' : 'arrowRight'

  return (
    <motion.div
      className="svc-card"
      style={{ '--card-accent': service.accent }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="svc-card__top">
        <span className="svc-card__icon"><Icon name={service.icon} size={20} /></span>
        {onToggleSave && (
          <button
            className={`svc-card__pin ${isSaved ? 'is-pinned' : ''}`}
            onClick={() => onToggleSave(service.id)}
            aria-label={isSaved ? 'Unsave' : 'Save'}
          >
            <Icon name={isSaved ? 'pinFilled' : 'pin'} size={16} />
          </button>
        )}
      </div>

      <span className={`svc-card__badge svc-card__badge--${service.kind}`}>{badge}</span>
      <p className="svc-card__name">{service.name[lang]}</p>
      <p className="svc-card__tagline">{service.tagline[lang]}</p>
      <p className="svc-card__body">{service.body[lang]}</p>

      <button className="svc-card__cta" onClick={() => onOpen(service)}>
        {service.cta[lang]}
        <Icon name={arrow} size={14} />
      </button>
    </motion.div>
  )
}

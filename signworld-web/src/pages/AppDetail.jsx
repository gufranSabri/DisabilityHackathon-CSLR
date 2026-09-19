import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { Section } from '../components/Section'
import Avatar3D from '../components/Avatar3D'
import { signsFor } from '../lib/signs'
import { APPS, MOMENTS } from '../content'

// each flagship app signs clips from its own domain
const APP_TOPIC = { education: 'education', medical: 'medical', children: 'kids', publicSafety: 'emergency' }

export default function AppDetail() {
  const { id } = useParams()
  const { lang, dir, t } = useL()
  const app = APPS.find((a) => a.id === id)
  if (!app) return <Navigate to="/apps" replace />

  const d = t.appDetail
  const arrow = dir === 'rtl' ? 'arrowLeft' : 'arrowRight'
  const backArrow = dir === 'rtl' ? 'arrowRight' : 'arrowLeft'
  const moment = MOMENTS.find((m) => m.id === app.moment)

  return (
    <>
      <section className="page-hero" style={{ '--accent': app.accent }}>
        <div className="wrap">
          <Link to="/apps" className="page-hero__back"><Icon name={backArrow} size={14} /> {d.backToApps}</Link>
          <span className="page-hero__badge"><Icon name="brain" size={13} /> {d.brainNote}</span>
          <h1 className="page-hero__title">{app.name[lang]}</h1>
          <p className="page-hero__sub">{app.tagline[lang]}</p>
          <Link className="btn btn--primary" to={`/apps/${app.id}/open`}>
            {d.openApp} <Icon name={arrow} size={14} />
          </Link>
        </div>
      </section>

      <Section>
        <div className="detail-split">
          <div className="detail-preview" style={{ '--accent': app.accent }}>
            <img src={`/shots/${app.id}.svg`} alt={app.name[lang]} />
          </div>
          <div className="detail-avatar" style={{ '--accent': app.accent }}>
            <Avatar3D
              signId={signsFor(APP_TOPIC[app.id])}
              lang={lang}
              caption={app.tagline[lang]}
              accent={app.accent}
              badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'}
            />
          </div>
        </div>
        <blockquote className="impact-quote">
          <Icon name="quote" size={22} />
          <p>{app.impactLine[lang]}</p>
        </blockquote>
      </Section>

      <Section tint>
        <h2 className="section__h">{d.howTitle}</h2>
        <div className="steps">
          {app.steps[lang].map((s, i) => (
            <motion.div key={i} className="step" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.06 }}>
              <span className="step__num">{i + 1}</span>
              <span className="step__icon"><Icon name={s.icon} size={18} /></span>
              <p>{s.t}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="section__h">{d.whoTitle}</h2>
        <div className="chips">
          {app.audience[lang].map((a) => <span key={a} className="chip">{a}</span>)}
        </div>

        <h2 className="section__h" style={{ marginTop: 40 }}>{d.integrationTitle}</h2>
        <div className="callout callout--muted">
          <span className="callout__icon"><Icon name="layers" size={20} /></span>
          <p>{app.integration[lang]}</p>
        </div>

        <div className="detail-links">
          {moment && (
            <Link to={`/directory/${moment.id}`} className="btn btn--ghost">
              {d.relatedMoment} <Icon name={arrow} size={14} />
            </Link>
          )}
          <Link to="/brain" className="btn btn--ghost">{t.nav.brain} <Icon name={arrow} size={14} /></Link>
        </div>
      </Section>
    </>
  )
}

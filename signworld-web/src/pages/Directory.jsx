import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { Section } from '../components/Section'
import { MOMENTS, APP_PWA_URL } from '../content'

export default function Directory() {
  const { lang, dir, t } = useL()
  const d = t.directory
  const arrow = dir === 'rtl' ? 'arrowLeft' : 'arrowRight'

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="page-hero__eyebrow">{t.nav.directory}</p>
          <h1 className="page-hero__title">{d.title}</h1>
          <p className="page-hero__sub">{d.sub}</p>
        </div>
      </section>

      <Section>
        <div className="dir-layout">
          <div className="dir-grid">
            {MOMENTS.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.05 }}>
                <Link to={`/directory/${m.id}`} className="dir-card">
                  <span className="dir-card__icon"><Icon name={m.icon} size={22} /></span>
                  <h3 className="dir-card__title">{m.title[lang]}</h3>
                  <p className="dir-card__body">{m.body[lang]}</p>
                  <span className="dir-card__meta">
                    {m.tools.length} {d.toolsCount} <Icon name={arrow} size={13} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <aside className="dir-rail">
            <h3>{d.railTitle}</h3>
            <p>{d.railBody}</p>
            <Link to="/get-the-app" className="btn btn--primary btn--sm">{d.railApp}</Link>
            <Link to="/toolkit" className="btn btn--ghost btn--sm">{d.railContact}</Link>
            <Link to="/emergency" className="dir-rail__emergency">
              <Icon name="siren" size={14} /> {d.emergencyCallout}
            </Link>
          </aside>
        </div>
      </Section>
    </>
  )
}

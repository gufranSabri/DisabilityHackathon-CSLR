import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { Section, SectionHead } from '../components/Section'
import { BRAIN, APPS } from '../content'

export default function Brain() {
  const { lang, dir, t } = useL()
  const b = t.brain
  const arrow = dir === 'rtl' ? 'arrowLeft' : 'arrowRight'

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="page-hero__eyebrow">{t.nav.brain}</p>
          <h1 className="page-hero__title">{b.title}</h1>
        </div>
      </section>

      <Section>
        <div className="prose">
          <h2>{b.visionTitle}</h2>
          <p>{b.vision}</p>
          <div className="callout">
            <span className="callout__icon"><Icon name="brain" size={20} /></span>
            <div>
              <strong>{b.slaas}</strong>
              <p>{b.slaasBody}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tint>
        <SectionHead title={b.capabilitiesTitle} />
        <div className="cap-table">
          {BRAIN.capabilities.map((c, i) => (
            <motion.div key={c.id} className="cap-row" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.05 }}>
              <span className="cap-row__icon"><Icon name={c.icon} size={22} /></span>
              <div className="cap-row__main">
                <span className="cap-row__dir">{c.dir[lang]}</span>
                <h3>{c.name[lang]}</h3>
                <p>{c.desc[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title={b.archTitle} sub={b.archSub} />
        <div className="arch">
          <div className="arch__brain">
            <Icon name="brain" size={28} />
            <span>{b.archBrain}</span>
          </div>
          <div className="arch__connectors" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className="arch__nodes">
            {BRAIN.architecture.map((n, i) => (
              <motion.div key={n.id} className="arch__node" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Icon name={n.icon} size={18} />
                <span>{n.name[lang]}</span>
              </motion.div>
            ))}
          </div>
          <div className="arch__corpus">{b.archCorpus}</div>
        </div>
      </Section>

      <Section tint>
        <SectionHead title={b.oneEngineTitle} sub={b.oneEngineBody} center />
        <div className="brain-apps">
          {APPS.map((a) => (
            <Link key={a.id} to={`/apps/${a.id}`} className="brain-app" style={{ '--accent': a.accent }}>
              <Icon name={a.icon} size={18} /> {a.name[lang]}
            </Link>
          ))}
          <Link to="/widget" className="brain-app brain-app--widget">
            <Icon name="code" size={18} /> {t.nav.widget}
          </Link>
        </div>
      </Section>
    </>
  )
}

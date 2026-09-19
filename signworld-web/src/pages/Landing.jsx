import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { Section, SectionHead } from '../components/Section'
import AppCard from '../components/AppCard'
import StatBar from '../components/StatBar'
import WidgetDemo from '../components/WidgetDemo'
import Avatar3D from '../components/Avatar3D'
import { APPS, BRAIN, MOMENTS, APP_PWA_URL } from '../content'

const WELCOME = { ar: 'أهلًا بك!', en: 'Welcome!' }

export default function Landing() {
  const { lang, dir, t } = useL()
  const L = t.landing
  const arrow = dir === 'rtl' ? 'arrowLeft' : 'arrowRight'

  return (
    <>
      {/* hero */}
      <section className="hero">
        <div className="wrap hero__inner">
          <div className="hero__text">
            <motion.p className="hero__eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Icon name="spark" size={13} /> {L.heroEyebrow}
            </motion.p>
            <motion.h1 className="hero__title" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.6 }}>
              {L.heroTitle}
            </motion.h1>
            <motion.p className="hero__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              {L.heroSub}
            </motion.p>
            <motion.div className="hero__actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.6 }}>
              <Link to="/apps" className="btn btn--primary">{L.ctaApps} <Icon name={arrow} size={15} /></Link>
              <Link to="/get-the-app" className="btn btn--ghost">{L.ctaGetApp}</Link>
            </motion.div>
          </div>
          <motion.div className="hero__visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <Avatar3D
              signId="00_0253"
              lang={lang}
              caption={WELCOME[lang]}
              badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'}
            />
          </motion.div>
        </div>
      </section>

      {/* the brain */}
      <Section tint>
        <SectionHead eyebrow={t.nav.brain} title={L.brainTitle} sub={L.brainSub} />
        <div className="cap-grid">
          {BRAIN.capabilities.map((c, i) => (
            <motion.div key={c.id} className="cap-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.06, duration: 0.4 }}>
              <span className="cap-card__icon"><Icon name={c.icon} size={22} /></span>
              <span className="cap-card__dir">{c.dir[lang]}</span>
              <h3 className="cap-card__name">{c.name[lang]}</h3>
              <p className="cap-card__desc">{c.desc[lang]}</p>
            </motion.div>
          ))}
        </div>
        <div className="section__cta">
          <Link to="/brain" className="btn btn--ghost">{L.brainMore} <Icon name={arrow} size={14} /></Link>
        </div>
      </Section>

      {/* four apps */}
      <Section>
        <SectionHead eyebrow={t.nav.apps} title={L.appsTitle} sub={L.appsSub} />
        <div className="appgrid">
          {APPS.map((app, i) => <AppCard key={app.id} app={app} index={i} />)}
        </div>
      </Section>

      {/* situational directory */}
      <Section tint>
        <SectionHead eyebrow={t.nav.directory} title={L.directoryTitle} sub={L.directorySub} />
        <div className="moment-chips">
          {MOMENTS.map((m) => (
            <Link key={m.id} to={`/directory/${m.id}`} className="moment-chip">
              <Icon name={m.icon} size={16} /> {m.title[lang]}
            </Link>
          ))}
        </div>
        <div className="section__cta">
          <Link to="/directory" className="btn btn--ghost">{L.directoryCta} <Icon name={arrow} size={14} /></Link>
        </div>
      </Section>

      {/* widget */}
      <Section>
        <div className="split">
          <div className="split__text">
            <SectionHead eyebrow={t.nav.widget} title={L.widgetTitle} sub={L.widgetSub} />
            <Link to="/widget" className="btn btn--primary">{L.widgetCta} <Icon name={arrow} size={15} /></Link>
          </div>
          <div className="split__media">
            <WidgetDemo compact />
          </div>
        </div>
      </Section>

      {/* impact */}
      <Section tint>
        <SectionHead title={L.impactTitle} center />
        <StatBar />
      </Section>

      {/* institutions */}
      <Section>
        <motion.div className="inst-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <div>
            <p className="inst-card__eyebrow">{t.nav.toolkit}</p>
            <h2 className="inst-card__title">{L.instTitle}</h2>
            <p className="inst-card__sub">{L.instSub}</p>
          </div>
          <Link to="/toolkit" className="btn btn--primary">{L.instCta} <Icon name={arrow} size={15} /></Link>
        </motion.div>
      </Section>
    </>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import Header from '../components/Header'
import AvatarStage from '../components/AvatarStage'
import { SERVICES, SITUATIONS, ANNOUNCEMENTS } from '../content'

const QUICK = ['sign2text', 'text2sign', 'sos', 'bookInterpreter', 'docAssistant', 'deafAssociation']

export default function Home(props) {
  const { lang, dir, t, toggleLang, navigate, bookings, history } = props
  const [announce, setAnnounce] = useState(null)

  const nextAppt = bookings
    .filter((b) => ['confirmed', 'pending'].includes(b.status))
    .sort((a, b) => new Date(a.dt) - new Date(b.dt))[0]

  const lastTranslation = history.find((h) => h.kind === 'sign2text' || h.kind === 'text2sign')

  const fmtDate = (dt) =>
    new Date(dt).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) +
    ' · ' +
    new Date(dt).toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      <Header lang={lang} dir={dir} title="SignWorld" onToggleLang={toggleLang} onBell={() => {}} notif={ANNOUNCEMENTS.length} />

      <div className="home-hero">
        <p className="home-hero__greeting">{t.home.greeting} 👋</p>
        <p className="home-hero__sub">{t.home.subtitle}</p>
      </div>

      <div className="home-primary">
        <motion.button className="home-primary__main" onClick={() => navigate({ tab: 'translate', mode: 'sign2text' })} whileTap={{ scale: 0.98 }}>
          <span className="home-primary__icon"><Icon name="camera" size={26} /></span>
          <span className="home-primary__label">{t.home.translateNow}</span>
          <span className="home-primary__meta">{t.home.translateNowSub}</span>
        </motion.button>
        <motion.button className="home-primary__side" onClick={() => navigate({ tab: 'translate', mode: 'text2sign' })} whileTap={{ scale: 0.98 }}>
          <span className="home-primary__icon home-primary__icon--sky"><Icon name="avatar" size={22} /></span>
          <span className="home-primary__label">{t.home.text2sign}</span>
          <span className="home-primary__meta">{t.home.text2signSub}</span>
        </motion.button>
      </div>

      <p className="home-sectitle">{t.home.quickActions}</p>
      <div className="quick-grid">
        {QUICK.map((id) => {
          const s = SERVICES[id]
          return (
            <button key={id} className="quick-tile" onClick={() => navigate(s.target)} style={{ '--tile-accent': s.accent }}>
              <span className="quick-tile__icon"><Icon name={s.icon} size={22} /></span>
              <span className="quick-tile__label">{s.name[lang]}</span>
            </button>
          )
        })}
      </div>

      <p className="home-sectitle">{t.home.yourDay}</p>
      <div className="home-day">
        <div className="home-day__card">
          <span className="home-day__k"><Icon name="clock" size={13} /> {t.home.lastSession}</span>
          <span className="home-day__v">{lastTranslation ? (lastTranslation.title || t.home.lastSession) : t.home.lastSessionEmpty}</span>
        </div>
        <button className="home-day__card" onClick={() => navigate({ tab: 'bookings' })}>
          <span className="home-day__k"><Icon name="calendar" size={13} /> {t.home.nextAppt}</span>
          <span className="home-day__v">
            {nextAppt
              ? `${fmtDate(nextAppt.dt)}`
              : t.home.nextApptEmpty}
          </span>
        </button>
      </div>

      <p className="home-sectitle">{t.home.situationsTitle}</p>
      <div className="home-situations">
        {SITUATIONS.map((s) => (
          <button key={s.id} className="home-sitchip" onClick={() => navigate({ tab: 'services', screen: 'situation', id: s.id })}>
            <Icon name={s.icon} size={16} />
            {s.title[lang]}
          </button>
        ))}
      </div>

      <p className="home-sectitle">{t.home.announcementsTitle}</p>
      <div className="home-announce">
        {ANNOUNCEMENTS.map((a) => (
          <div key={a.id} className="announce-card">
            <span className="announce-card__icon"><Icon name={a.icon} size={18} /></span>
            <div className="announce-card__body">
              <span className="announce-card__source">{a.source[lang]}</span>
              <span className="announce-card__title">{a.title[lang]}</span>
              <span className="announce-card__text">{a.body[lang]}</span>
              <button className="announce-card__watch" onClick={() => setAnnounce(a)}>
                <Icon name="play" size={13} /> {t.common.watchSigned}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="home-ribbon">
        {t.home.statRibbon.map((s) => <span key={s}>{s}</span>)}
      </div>

      <AnimatePresence>
        {announce && (
          <motion.div className="sheet-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAnnounce(null)}>
            <motion.div
              className="sheet"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sheet__handle" />
              <p className="sheet__title">{announce.title[lang]}</p>
              <AvatarStage signing caption={announce.body[lang]} badgeIdle={lang === 'ar' ? 'جاهز' : 'Idle'} badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'} />
              <button className="btn btn--primary" style={{ marginTop: 16 }} onClick={() => setAnnounce(null)}>{t.common.close}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

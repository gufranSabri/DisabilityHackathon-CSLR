import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icons'
import { SaduField, Divider } from './Ornaments'
import SignWorldMark from './SignWorldMark'
import AvatarStage from './AvatarStage'
import CameraCapture from './CameraCapture'
import IncidentMap from './IncidentMap'
import useLang from './useLang'
import { CONTENT, APP_NAME } from './content'
import './App.css'

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [incidentType, setIncidentType] = useState(null)
  const [detail, setDetail] = useState(null)
  const { lang, dir, t, toggle } = useLang(CONTENT)

  return (
    <div className={`app app--${screen}`} dir={dir}>
      <SaduField />
      <div className="vignette" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <Home key="home" t={t.home} lang={lang} onToggleLang={toggle} onStart={() => setScreen('incidentPicker')} />
        )}
        {screen === 'incidentPicker' && (
          <IncidentPicker
            key="incidentPicker"
            t={t.incidentPicker}
            lang={lang}
            selected={incidentType}
            onSelect={setIncidentType}
            onNav={setScreen}
          />
        )}
        {screen === 'live' && (
          <Live key="live" t={t.live} lang={lang} onNav={setScreen} />
        )}
        {screen === 'map' && (
          <MapScreen key="map" t={t.map} lang={lang} onNav={setScreen} />
        )}
        {screen === 'dispatch' && (
          <Dispatch key="dispatch" t={t.dispatch} onNav={setScreen} />
        )}
        {screen === 'broadcast' && (
          <Broadcast key="broadcast" t={t.broadcast} lang={lang} onNav={setScreen} />
        )}
        {screen === 'status' && (
          <Status key="status" t={t.status} onNav={setScreen} onOpenDetail={setDetail} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detail && (
          <IncidentDetail item={detail} t={t.incidentDetail} onClose={() => setDetail(null)} />
        )}
      </AnimatePresence>

      {!['home', 'incidentPicker'].includes(screen) && <TabBar t={t.nav} screen={screen} onNav={setScreen} />}
    </div>
  )
}

/* ------------------------------- home ------------------------------- */

function Home({ t, lang, onToggleLang, onStart }) {
  return (
    <motion.main className="screen home" {...fade}>
      <header className="topbar">
        <SignWorldMark app={APP_NAME[lang]} lang={lang} />
        <button className="langbtn" onClick={onToggleLang}>{lang === 'ar' ? 'EN' : 'ع'}</button>
      </header>

      <div className="status-strip">
        <span className="status-strip__dot" />
        <span className="status-strip__label">{t.status.label}</span>
        <span className="status-strip__time">{t.status.node}</span>
      </div>

      <motion.p className="home__eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}>
        {t.eyebrow}
      </motion.p>
      <motion.h1 className="home__title" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
        {t.title}
      </motion.h1>
      <motion.p className="home__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}>
        {t.subtitle}
      </motion.p>

      <motion.div className="home__cta" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <button className="callbtn" onClick={onStart}>
          <span className="callbtn__ring" aria-hidden="true" />
          <span className="callbtn__icon"><Icon name="phone" size={26} /></span>
          <span className="callbtn__text">
            <span className="callbtn__title">{t.startTitle}</span>
            <span className="callbtn__sub">{t.startSub}</span>
          </span>
        </button>
        <button className="advance" onClick={onStart}>
          {t.startBtn}
          <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={16} />
        </button>
      </motion.div>

      <Divider />

      <motion.div className="home__foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
        <p className="home__stat">{t.stat}</p>
        <p className="home__trust"><Icon name="shield" size={13} /> {t.trust}</p>
      </motion.div>
    </motion.main>
  )
}

/* ------------------------------- incident type picker ------------------------------- */

function IncidentPicker({ t, lang, selected, onSelect, onNav }) {
  return (
    <motion.main className="screen incidentPicker" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('home')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.subject}</span>
        </div>
      </header>

      <div className="incident-grid">
        {t.types.map((type, i) => (
          <motion.button
            key={type.id}
            className={`incident-tile ${selected === type.id ? 'is-selected' : ''}`}
            style={{ '--tile-color': type.color }}
            onClick={() => onSelect(type.id)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="incident-tile__icon"><Icon name={type.icon} size={19} /></span>
            <span className="incident-tile__title">{type.title}</span>
            <span className="incident-tile__sub">{type.sub}</span>
          </motion.button>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <button className="advance advance--alert" onClick={() => onNav('live')} disabled={!selected}>
          {t.nextBtn}
          <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={16} />
        </button>
      </div>
    </motion.main>
  )
}

/* ------------------------------- live ------------------------------- */

function Live({ t, lang, onNav }) {
  const [captionIdx, setCaptionIdx] = useState(0)
  const [signing, setSigning] = useState(true)
  const [asking, setAsking] = useState(false)
  const [callerDone, setCallerDone] = useState(false)
  const [seconds, setSeconds] = useState(42)
  const handleCallerResult = useCallback(() => setCallerDone(true), [])

  useEffect(() => {
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    if (asking) return
    setSigning(true)
    const t1 = setTimeout(() => setSigning(false), 1800)
    const t2 = setTimeout(() => {
      setCaptionIdx((i) => (i + 1) % t.captions.length)
    }, 3400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [captionIdx, asking, t.captions.length])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <motion.main className="screen live" {...fade}>
      <div className="urgency-banner">
        <span className="urgency-banner__dot" aria-hidden="true" />
        <span className="urgency-banner__label">{t.badge}</span>
        <span className="urgency-banner__timer mono">{mm}:{ss}</span>
      </div>

      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('incidentPicker')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject mono">{t.subject}</span>
        </div>
      </header>

      <section className="panel">
        <p className="panel__label">
          <Icon name="hand" size={13} /> {t.callerLabel}
        </p>
        <CameraCapture
          active={asking}
          onResult={handleCallerResult}
          resultText={t.callerResult}
          label={lang === 'ar' ? 'كاميرا المتصل' : 'Caller camera'}
        />
      </section>

      <section className="panel">
        <p className="panel__label">
          <Icon name="avatar" size={13} /> {t.dispatchLabel}
        </p>
        <AvatarStage signing={!asking && signing} caption={!asking ? t.captions[captionIdx] : ''} />
      </section>

      <div className="quickreplies">
        {t.quickReplies.map((q, i) => (
          <button key={i} className="chip chip--tap" onClick={() => setCaptionIdx(i % t.captions.length)}>
            {q}
          </button>
        ))}
      </div>

      <div className="field field--input">
        <input className="field__input" type="text" placeholder={t.inputPlaceholder} readOnly />
        <button className="iconbtn iconbtn--accent" aria-label={t.sendBtn}>
          <Icon name="send" size={17} />
        </button>
      </div>

      <div className="live__actions">
        <button
          className="advance advance--ghost"
          onClick={() => { setAsking((a) => !a); setCallerDone(false) }}
        >
          <Icon name="hand" size={15} />
          {asking ? (lang === 'ar' ? 'إخفاء الكاميرا' : 'Hide camera') : t.askBtn}
        </button>
        <button className="advance advance--alert" onClick={() => onNav('map')}>
          {t.endBtn}
          <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={15} />
        </button>
      </div>
    </motion.main>
  )
}

/* ------------------------------- map screen ------------------------------- */

function MapScreen({ t, lang, onNav }) {
  return (
    <motion.main className="screen mapscreen" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('live')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject mono">{t.subject}</span>
        </div>
        <Icon name="map" size={17} className="broadcast__icon" />
      </header>

      <IncidentMap label={t.label} eta={t.eta} units={t.units ?? []} />

      <p className="panel__label"><Icon name="pin" size={12} /> {t.unitsLabel}</p>

      <div style={{ marginTop: 'auto' }}>
        <button className="advance" onClick={() => onNav('dispatch')}>
          {t.nextBtn}
          <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={15} />
        </button>
      </div>
    </motion.main>
  )
}

/* ------------------------------- dispatch board ------------------------------- */

function Dispatch({ t, onNav }) {
  const statusClass = { available: 'available', enroute: 'enroute', onscene: 'onscene' }

  return (
    <motion.main className="screen dispatch" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('map')} aria-label={t.back}>
          <Icon name="arrowRight" size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.sub}</span>
        </div>
      </header>

      <div className="unit-list">
        {t.units.map((u, i) => (
          <motion.div
            key={u.id}
            className="unit-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <span className="unit-row__icon" style={{ '--unit-color': u.color }}><Icon name={u.icon} size={16} /></span>
            <div className="unit-row__body">
              <span className="unit-row__name">{u.name} <span className="mono" style={{ color: 'var(--cream-dim)', fontSize: 11 }}>#{u.id}</span></span>
              <div className="unit-row__meta">{u.meta}</div>
            </div>
            <span className={`unit-row__status unit-row__status--${statusClass[u.status]}`}>{t.statusLabel[u.status]}</span>
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}

/* ----------------------------- broadcast ----------------------------- */

function Broadcast({ t, lang, onNav }) {
  const [captionIdx, setCaptionIdx] = useState(0)
  const [signing, setSigning] = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    setSigning(true)
    const t1 = setTimeout(() => setSigning(false), 1800)
    const t2 = setTimeout(() => {
      setCaptionIdx((i) => (i + 1) % t.captions.length)
    }, 3800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [captionIdx, paused, t.captions.length])

  return (
    <motion.main className="screen broadcast" {...fade}>
      <div className="urgency-banner urgency-banner--broadcast">
        <span className="urgency-banner__dot" aria-hidden="true" />
        <span className="urgency-banner__label">🔴 {t.liveBadge}</span>
      </div>

      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('home')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.subject}</span>
        </div>
        <Icon name="broadcast" size={17} className="broadcast__icon" />
      </header>

      <section className="panel">
        <p className="panel__label">
          <Icon name="avatar" size={13} /> {t.captionLabel}
        </p>
        <AvatarStage signing={!paused && signing} caption={t.captions[captionIdx]} accent="var(--amber-soft)" />
      </section>

      <div className="broadcast__captionlist">
        {t.captions.map((c, i) => (
          <p key={i} className={`broadcast__line ${i === captionIdx ? 'is-active' : ''}`}>
            {c}
          </p>
        ))}
      </div>

      <button className="advance advance--ghost" onClick={() => setPaused((p) => !p)}>
        <Icon name={paused ? 'play' : 'siren'} size={15} />
        {paused ? t.resumeBtn : t.pauseBtn}
      </button>
    </motion.main>
  )
}

/* ------------------------------- status (incident log) ------------------------------- */

function Status({ t, onNav, onOpenDetail }) {
  return (
    <motion.main className="screen status" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('home')} aria-label={t.back}>
          <Icon name="arrowRight" size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.sub}</span>
        </div>
      </header>

      <div className="list">
        {t.items.map((item, i) => (
          <motion.button
            key={item.id}
            className="list__row"
            onClick={() => onOpenDetail(item)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <span className="list__icon"><Icon name="siren" size={16} /></span>
            <div className="list__body">
              <span className="list__title">{item.kind}</span>
              <span className="list__meta">{item.loc} · {item.time}</span>
            </div>
            <span className={`status-chip status-chip--${item.status}`}>
              {t.statusLabel[item.status]}
            </span>
            <span className="list__chevron"><Icon name="arrowRight" size={13} /></span>
          </motion.button>
        ))}
      </div>
    </motion.main>
  )
}

/* ------------------------------- incident detail sheet ------------------------------- */

function IncidentDetail({ item, t, onClose }) {
  return (
    <motion.div className="incident-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="incident-detail__sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="incident-detail__handle" />
        <div className="incident-detail__head">
          <span className="incident-detail__id mono">#{item.id}</span>
          <button className="iconbtn" onClick={onClose} aria-label={t.closeBtn}>
            <Icon name="close" size={15} />
          </button>
        </div>

        <div className="incident-detail__section">
          <p className="incident-detail__label">{item.kind}</p>
          <span className={`status-chip status-chip--${item.status}`}>{t.statusLabel[item.status]}</span>
        </div>

        <div className="incident-detail__section">
          <p className="incident-detail__label">{t.transcriptLabel}</p>
          <p className="incident-detail__text">{item.transcript}</p>
        </div>

        <div className="incident-detail__section">
          <p className="incident-detail__label">{t.unitLabel}</p>
          <p className="incident-detail__text">{item.unit}</p>
        </div>

        <div className="incident-detail__section">
          <p className="incident-detail__label">{t.timelineLabel}</p>
          <div className="timeline">
            {item.timeline.map((row, i) => (
              <div className="timeline__row" key={i}>
                <span className="timeline__dot" />
                <div className="timeline__body">
                  <span className="timeline__time mono">{row.time}</span>
                  <p className="timeline__text">{row.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------- tab bar ------------------------------- */

function TabBar({ t, screen, onNav }) {
  const tabs = [
    { key: 'live', icon: 'phone', label: t.live },
    { key: 'broadcast', icon: 'broadcast', label: t.broadcast },
    { key: 'dispatch', icon: 'map', label: t.dispatch },
    { key: 'status', icon: 'history', label: t.status },
  ]
  const activeKeys = { map: 'live', incidentPicker: 'live' }
  const activeScreen = activeKeys[screen] ?? screen

  return (
    <nav className="tabbar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tabbar__btn ${activeScreen === tab.key ? 'is-on' : ''}`}
          onClick={() => onNav(tab.key)}
        >
          <Icon name={tab.icon} size={18} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

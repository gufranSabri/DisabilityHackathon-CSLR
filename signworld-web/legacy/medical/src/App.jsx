import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icons'
import { SaduField, Divider } from './Ornaments'
import SignWorldMark from './SignWorldMark'
import AvatarStage from './AvatarStage'
import CameraCapture from './CameraCapture'
import VitalsMonitor from './VitalsMonitor'
import BodyMap from './BodyMap'
import useLang from './useLang'
import { CONTENT, APP_NAME } from './content'
import './App.css'

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

const INTAKE_STEPS = ['checkin', 'vitals', 'symptom', 'triageResult']

// Fixed demo mapping from symptom body-zone -> triage severity + vitals
// preset. Not real triage logic — a plausible-looking, deterministic map so
// the flow feels connected end to end.
const ZONE_TRIAGE = {
  chest: { level: 'urgent', vitals: { hr: 121, spo2: 92, bp: '150/95' } },
  head: { level: 'urgent', vitals: { hr: 102, spo2: 96, bp: '112/74' } },
  abdomen: { level: 'moderate', vitals: { hr: 90, spo2: 97, bp: '124/80' } },
  armL: { level: 'nonUrgent', vitals: { hr: 74, spo2: 99, bp: '116/76' } },
  armR: { level: 'moderate', vitals: { hr: 86, spo2: 98, bp: '120/78' } },
  legL: { level: 'nonUrgent', vitals: { hr: 72, spo2: 99, bp: '114/74' } },
  legR: { level: 'nonUrgent', vitals: { hr: 72, spo2: 99, bp: '114/74' } },
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [zone, setZone] = useState(null)
  const [caseDetail, setCaseDetail] = useState(null)
  const { lang, dir, t, toggle } = useLang(CONTENT)

  const triage = zone ? ZONE_TRIAGE[zone] : ZONE_TRIAGE.chest

  return (
    <div className={`app app--${screen}`} dir={dir}>
      <SaduField />
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <Home key="home" t={t.home} lang={lang} onToggleLang={toggle} onPick={setScreen} />
        )}
        {screen === 'checkin' && (
          <CheckIn key="checkin" t={t.checkin} lang={lang} onNav={setScreen} />
        )}
        {screen === 'vitals' && (
          <VitalsStep key="vitals" t={t.vitals} lang={lang} vitals={triage.vitals} onNav={setScreen} />
        )}
        {screen === 'symptom' && (
          <Symptom key="symptom" t={t.symptom} bodyZones={t.bodyZones} lang={lang} zone={zone} onZone={setZone} onNav={setScreen} />
        )}
        {screen === 'triageResult' && (
          <TriageResult key="triageResult" t={t.triageResult} lang={lang} level={triage.level} onNav={setScreen} />
        )}
        {screen === 'queue' && (
          <Queue key="queue" t={t.queue} triageDict={t.triage} onNav={setScreen} onOpenCase={setCaseDetail} />
        )}
        {screen === 'settings' && (
          <Settings key="settings" t={t.settings} lang={lang} onToggleLang={toggle} onNav={setScreen} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {caseDetail && (
          <CaseDetail
            item={caseDetail}
            t={t.caseDetail}
            triageDict={t.triage}
            onClose={() => setCaseDetail(null)}
          />
        )}
      </AnimatePresence>

      {['queue', 'settings'].includes(screen) && <TabBar t={t.nav} screen={screen} onNav={setScreen} />}
    </div>
  )
}

/* ------------------------------- home ------------------------------- */

function Home({ t, lang, onToggleLang, onPick }) {
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

      <div className="home__choices">
        {[
          { key: 'patient', icon: 'hand', d: t.patient, delay: 0.55, target: 'checkin' },
          { key: 'clinician', icon: 'pulse', d: t.clinician, delay: 0.7, target: 'queue' },
        ].map(({ key, icon, d, delay, target }) => (
          <motion.button
            key={key}
            className={`gate gate--${key}`}
            onClick={() => onPick(target)}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.985 }}
          >
            <span className="gate__icon"><Icon name={icon} size={22} /></span>
            <span className="gate__title">{d.title}</span>
            <span className="gate__sub">{d.sub}</span>
            <span className="gate__go">
              {lang === 'ar' ? 'ابدأ' : 'Begin'}
              <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={13} />
            </span>
          </motion.button>
        ))}
      </div>

      <Divider />

      <motion.p className="home__foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
        {t.stat}
      </motion.p>
    </motion.main>
  )
}

/* ------------------------------- steps progress ------------------------------- */

function StepsBar({ current }) {
  const idx = INTAKE_STEPS.indexOf(current)
  return (
    <div className="steps">
      {INTAKE_STEPS.map((s, i) => (
        <span key={s} className={`steps__item ${i < idx ? 'is-done' : i === idx ? 'is-on' : ''}`} />
      ))}
    </div>
  )
}

/* ------------------------------- check-in ------------------------------- */

function CheckIn({ t, lang, onNav }) {
  const [caseId] = useState(() => `A-${200 + Math.floor(Math.random() * 90)}`)
  const [time] = useState(() => new Date().toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }))

  return (
    <motion.main className="screen checkin" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('home')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.subject}</span>
        </div>
      </header>

      <StepsBar current="checkin" />

      <div className="field">
        <span className="field__label"><Icon name="cross" size={14} /> {t.idLabel}</span>
        <span className="field__value mono">#{caseId}</span>
      </div>
      <div className="field">
        <span className="field__label"><Icon name="building" size={14} /> {t.deptLabel}</span>
        <span className="field__value">{t.dept}</span>
      </div>
      <div className="field">
        <span className="field__label"><Icon name="clock" size={14} /> {t.timeLabel}</span>
        <span className="field__value mono">{time}</span>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <button className="advance" onClick={() => onNav('vitals')}>
          {t.nextBtn}
          <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={15} />
        </button>
      </div>
    </motion.main>
  )
}

/* ------------------------------- vitals ------------------------------- */

function VitalsStep({ t, lang, vitals, onNav }) {
  return (
    <motion.main className="screen vitals-step" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('checkin')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.subject}</span>
        </div>
        <span className="live__dot" />
      </header>

      <StepsBar current="vitals" />

      <VitalsMonitor labels={t} hr={vitals.hr} spo2={vitals.spo2} bp={vitals.bp} />
      <p className="camera__status" style={{ marginBottom: 16 }}>{t.note}</p>

      <div style={{ marginTop: 'auto' }}>
        <button className="advance" onClick={() => onNav('symptom')}>
          {t.nextBtn}
          <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={15} />
        </button>
      </div>
    </motion.main>
  )
}

/* ------------------------------- symptom ------------------------------- */

function Symptom({ t, bodyZones, lang, zone, onZone, onNav }) {
  const [capturing, setCapturing] = useState(false)
  const [done, setDone] = useState(false)

  return (
    <motion.main className="screen symptom" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('vitals')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.subject}</span>
        </div>
      </header>

      <StepsBar current="symptom" />

      <BodyMap
        selected={zone}
        onSelect={onZone}
        hint={t.mapHint}
        selectedLabel={zone ? bodyZones[zone] : ''}
      />

      <section className="panel">
        <p className="panel__label"><Icon name="hand" size={13} /> {t.patientLabel}</p>
        <CameraCapture
          active={capturing}
          onResult={() => setDone(true)}
          resultText={t.patientResult}
          label={lang === 'ar' ? 'كاميرا المريض' : 'Patient camera'}
        />
      </section>

      <div className="live__actions">
        <button
          className="advance advance--ghost"
          onClick={() => { setCapturing((a) => !a); setDone(false) }}
        >
          <Icon name="camera" size={15} />
          {capturing ? t.hideBtn : t.askBtn}
        </button>
        <button className="advance" onClick={() => onNav('triageResult')} disabled={!zone}>
          {t.nextBtn}
          <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={15} />
        </button>
      </div>
    </motion.main>
  )
}

/* ------------------------------- triage result ------------------------------- */

function TriageResult({ t, lang, level, onNav }) {
  const [captionIdx, setCaptionIdx] = useState(0)
  const [signing, setSigning] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setSigning(false), 1800)
    const t2 = setTimeout(() => setCaptionIdx((i) => (i + 1) % t.captions.length), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [captionIdx, t.captions.length])

  const levelKey = level === 'urgent' ? 'level-urgent' : level === 'moderate' ? 'level-moderate' : 'level-nonurgent'
  const levelLabel = level === 'urgent' ? t.levelUrgent : level === 'moderate' ? t.levelModerate : t.levelNonUrgent
  const bodyText = level === 'urgent' ? t.bodyUrgent : level === 'moderate' ? t.bodyModerate : t.bodyNonUrgent
  const icon = level === 'urgent' ? 'alert' : level === 'moderate' ? 'clock' : 'check'

  return (
    <motion.main className="screen triage" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('symptom')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.subject}</span>
        </div>
      </header>

      <StepsBar current="triageResult" />

      <motion.div
        className={`triage-result ${levelKey}`}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="triage-result__ring"
          animate={level === 'urgent' ? { boxShadow: ['0 0 0px currentColor', '0 0 24px currentColor', '0 0 0px currentColor'] } : {}}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <Icon name={icon} size={34} />
        </motion.div>
        <span className="triage-result__level mono">{levelLabel}</span>
        <p className="triage-result__body">{bodyText}</p>
      </motion.div>

      <section className="panel">
        <p className="panel__label"><Icon name="pulse" size={13} /> {t.clinicianLabel}</p>
        <AvatarStage signing={signing} caption={t.captions[captionIdx]} />
      </section>

      <button className="advance" onClick={() => onNav('queue')}>
        {t.endBtn}
        <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={15} />
      </button>
    </motion.main>
  )
}

/* ------------------------------- queue ------------------------------- */

function Queue({ t, triageDict, onNav, onOpenCase }) {
  const dotClass = useMemo(() => ({ urgent: 'is-urgent', moderate: 'is-moderate', nonUrgent: 'is-nonurgent' }), [])

  return (
    <motion.main className="screen queue" {...fade}>
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
            onClick={() => onOpenCase(item)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            style={{ border: 'none', width: '100%', font: 'inherit', color: 'inherit', textAlign: 'start' }}
          >
            <span className={`list__dot ${dotClass[item.triage]}`} aria-hidden="true" />
            <div className="list__body">
              <span className="list__title">#{item.id}</span>
              <span className="list__meta">{item.complaint}</span>
            </div>
            <div className="list__wait">
              <Icon name="clock" size={12} />
              <span>{item.wait}</span>
            </div>
            <span className="list__chevron"><Icon name="arrowRight" size={14} /></span>
          </motion.button>
        ))}
      </div>
    </motion.main>
  )
}

/* ------------------------------- case detail ------------------------------- */

function CaseDetail({ item, t, triageDict, onClose }) {
  return (
    <motion.div
      className="case-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="case-detail__sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="case-detail__handle" />
        <div className="case-detail__head">
          <span className="case-detail__id mono">#{item.id}</span>
          <button className="iconbtn" onClick={onClose} aria-label={t.closeBtn}>
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className="case-detail__section">
          <p className="case-detail__label">{t.triageLabel}</p>
          <span className={`triage-badge is-${item.triage === 'nonUrgent' ? 'nonurgent' : item.triage}`}>
            <Icon name="alert" size={13} />
            <span className="triage-badge__value">{triageDict[item.triage]}</span>
          </span>
        </div>

        <div className="case-detail__section">
          <p className="case-detail__label">{t.vitalsLabel}</p>
          <VitalsMonitor labels={{ hr: t.hr, spo2: t.spo2, bp: t.bp }} hr={item.vitals.hr} spo2={item.vitals.spo2} bp={item.vitals.bp} />
        </div>

        <div className="case-detail__section">
          <p className="case-detail__label">{t.zoneLabel}</p>
          <p className="case-detail__text">{item.zone}</p>
        </div>

        <div className="case-detail__section">
          <p className="case-detail__label">{t.transcriptLabel}</p>
          <p className="case-detail__text">{item.transcript}</p>
        </div>

        <div className="case-detail__section">
          <p className="case-detail__label">{t.reasoningLabel}</p>
          <p className="case-detail__text">{item.reasoning}</p>
        </div>

        <button className="advance">
          <Icon name="pulse" size={15} />
          {t.respondBtn}
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------ settings ------------------------------ */

function Settings({ t, lang, onToggleLang, onNav }) {
  return (
    <motion.main className="screen settings" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('home')} aria-label={t.back}>
          <Icon name="arrowRight" size={16} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
        </div>
      </header>

      <div className="field">
        <span className="field__label"><Icon name="building" size={14} /> {t.deptLabel}</span>
        <span className="field__value">{t.dept}</span>
      </div>

      <div className="field">
        <span className="field__label"><Icon name="avatar" size={14} /> {t.avatarLabel}</span>
        <div className="chips">
          {t.avatars.map((a, i) => (
            <span key={a} className={`chip ${i === 0 ? 'is-on' : ''}`}>{a}</span>
          ))}
        </div>
      </div>

      <div className="field">
        <span className="field__label"><Icon name="settings" size={14} /> {t.langLabel}</span>
        <button className="langbtn langbtn--inline" onClick={onToggleLang}>
          {lang === 'ar' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="badge-strip">
        <Icon name="check" size={13} /> {t.integration}
      </div>
    </motion.main>
  )
}

/* ------------------------------- tab bar ------------------------------- */

function TabBar({ t, screen, onNav }) {
  const tabs = [
    { key: 'queue', icon: 'users', label: t.queue },
    { key: 'settings', icon: 'settings', label: t.settings },
  ]
  return (
    <nav className="tabbar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tabbar__btn ${screen === tab.key ? 'is-on' : ''}`}
          onClick={() => onNav(tab.key)}
        >
          <Icon name={tab.icon} size={18} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

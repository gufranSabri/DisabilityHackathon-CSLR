import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icons'
import { SaduField, Divider, ChalkDust } from './Ornaments'
import SignWorldMark from './SignWorldMark'
import Avatar3D from './Avatar3D'
import CameraCapture from './CameraCapture'
import useLang from './useLang'
import { CONTENT, APP_NAME } from './content'
import { signsFor, signsForText } from './signs'
import './App.css'

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

// clips aligned 1:1 with t.session.captions (caption n ↔ clip n)
const LESSON_SIGNS = ['00_0100', '00_0108', '00_0103', '00_0077']

const LOCAL = {
  ar: { teacherHi: 'صباح الخير! جاهزون لحصة اليوم؟', studentHi: 'صباح الخير! اختر درسك واقرأ في المكتبة.', welcome: 'أهلًا بك في الحصة!', backToLesson: 'العودة إلى الدرس', answering: 'الإجابة على', preview: 'معاينة الرمز الرقمي' },
  en: { teacherHi: 'Good morning! Ready for today’s class?', studentHi: 'Good morning! Pick a lesson from the library.', welcome: 'Welcome to class!', backToLesson: 'Back to the lesson', answering: 'Answering', preview: 'Avatar preview' },
}
const STYLE_ACCENTS = ['var(--copper-soft)', 'var(--teal-soft, #5fd0b8)', 'var(--cream)']

export default function App() {
  const [role, setRole] = useState(null) // null | 'teacher' | 'student'
  const [screen, setScreen] = useState('role')
  const { lang, dir, t, toggle } = useLang(CONTENT)

  const pickRole = (r) => {
    setRole(r)
    setScreen(r === 'teacher' ? 'dashboard' : 'library')
  }

  const goHome = () => {
    setRole(null)
    setScreen('role')
  }

  const tabs = role ? t.nav[role] : null

  return (
    <div className={`app app--${screen}`} dir={dir}>
      <SaduField />
      {screen === 'role' && <ChalkDust />}
      <div className="vignette" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {screen === 'role' && (
          <RolePicker key="role" t={t.role} lang={lang} onToggleLang={toggle} onPick={pickRole} />
        )}
        {screen === 'dashboard' && (
          <Dashboard key="dashboard" t={t.dashboard} lang={lang} onNav={setScreen} onHome={goHome} />
        )}
        {screen === 'session' && (
          <Session key="session" t={t.session} lang={lang} role={role} onNav={setScreen} />
        )}
        {screen === 'library' && (
          <Library key="library" t={t.library} lang={lang} onNav={setScreen} onHome={goHome} />
        )}
        {screen === 'analytics' && (
          <Analytics key="analytics" t={t.analytics} onNav={setScreen} />
        )}
        {screen === 'settings' && (
          <Settings key="settings" t={t.settings} lang={lang} onToggleLang={toggle} onNav={setScreen} onHome={goHome} switchLabel={t.role.switchRole} />
        )}
      </AnimatePresence>

      {role && tabs && <TabBar t={tabs} role={role} screen={screen} onNav={setScreen} />}
    </div>
  )
}

/* ------------------------------- role picker (home) ------------------------------- */

function RolePicker({ t, lang, onToggleLang, onPick }) {
  return (
    <motion.main className="screen home" {...fade}>
      <header className="topbar">
        <SignWorldMark app={APP_NAME[lang]} lang={lang} />
        <button className="langbtn" onClick={onToggleLang}>{lang === 'ar' ? 'EN' : 'ع'}</button>
      </header>

      <motion.p className="home__eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}>
        {t.eyebrow}
      </motion.p>
      <motion.h1 className="home__title" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
        {t.title}
      </motion.h1>
      <motion.p className="home__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}>
        {t.subtitle}
      </motion.p>

      <Avatar3D signId="00_0253" lang={lang} caption={LOCAL[lang].welcome} compact badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'} />

      <div className="home__choices">
        {[
          { key: 'teacher', icon: 'mic', d: t.teacher, delay: 0.55 },
          { key: 'student', icon: 'hand', d: t.student, delay: 0.7 },
        ].map(({ key, icon, d, delay }) => (
          <motion.button
            key={key}
            className={`gate gate--${key}`}
            onClick={() => onPick(key)}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.975 }}
          >
            <span className="gate__icon"><Icon name={icon} size={26} /></span>
            <span className="gate__title">{d.title}</span>
            <span className="gate__sub">{d.sub}</span>
            <span className="gate__go">
              {lang === 'ar' ? 'ابدأ' : 'Begin'}
              <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={15} />
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

/* ------------------------------- teacher dashboard ------------------------------- */

function Dashboard({ t, lang, onNav, onHome }) {
  return (
    <motion.main className="screen dashboard" {...fade}>
      <header className="topbar">
        <SignWorldMark app={APP_NAME[lang]} lang={lang} />
        <button className="iconbtn" onClick={onHome} aria-label="Home">
          <Icon name="arrowRight" size={16} />
        </button>
      </header>

      <div className="dash-greeting">
        <span className="dash-greeting__hand">{t.hello}</span>
        <span className="dash-greeting__sub">{t.sub}</span>
      </div>

      <Avatar3D signId={['00_0253', '00_0100']} lang={lang} caption={LOCAL[lang].teacherHi} compact badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'} />

      <div className="stat-row">
        {t.stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
          >
            <span className="stat-card__value">{s.value}</span>
            <span className="stat-card__label">{s.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="section-label">
        <span className="section-label__title">{t.classesLabel}</span>
      </div>

      <div className="class-grid">
        {t.classes.map((c, i) => (
          <motion.button
            key={c.id}
            className="class-card"
            onClick={() => onNav('session')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="class-card__swatch" style={{ background: c.color }} />
            <div className="class-card__body">
              <span className="class-card__title">{c.title}</span>
              <span className="class-card__meta">{c.time} · {c.students} {lang === 'ar' ? 'طالب' : 'students'}</span>
            </div>
            <span className="class-card__badge">{t.startBtn}</span>
          </motion.button>
        ))}
      </div>
    </motion.main>
  )
}

/* ------------------------------- session (shared teacher/student) ------------------------------- */

function Session({ t, lang, role, onNav }) {
  const [message, setMessage] = useState(null)   // a student's question the avatar is signing back
  const [asking, setAsking] = useState(false)
  const [studentDone, setStudentDone] = useState(false)
  const [agendaIdx, setAgendaIdx] = useState(1)

  const answer = (q) => setMessage({
    text: `${q.name}: ${q.text}`,
    ids: signsForText(q.text, 'education'),
  })

  const backTarget = role === 'teacher' ? 'dashboard' : 'library'

  return (
    <motion.main className="screen live" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav(backTarget)} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={18} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.subject}</span>
        </div>
        <span className="live__dot" aria-hidden="true" />
      </header>

      {role === 'teacher' && (
        <>
          <p className="panel__label"><Icon name="calendar" size={13} /> {t.agendaLabel}</p>
          <div className="agenda">
            {t.agenda.map((item, i) => (
              <button
                key={item.label}
                className={`agenda__item ${i === agendaIdx ? 'is-active' : ''} ${i < agendaIdx ? 'is-done' : ''}`}
                onClick={() => setAgendaIdx(i)}
              >
                <span className="agenda__marker">{i < agendaIdx ? <Icon name="check" size={11} /> : i + 1}</span>
                <span className="agenda__label">{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <section className="panel">
        <p className="panel__label">
          <Icon name="mic" size={14} /> {t.teacherLabel}
        </p>
        <Avatar3D
          signId={message ? message.ids : LESSON_SIGNS}
          lang={lang}
          caption={message ? message.text : t.captions}
          badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'}
        />
        {message && (
          <button className="chip chip--tap" onClick={() => setMessage(null)}>{LOCAL[lang].backToLesson}</button>
        )}
      </section>

      {role === 'teacher' && (
        <>
          <p className="panel__label"><Icon name="raiseHand" size={13} /> {t.queueLabel}</p>
          <div className="qqueue">
            {t.queue.map((q) => (
              <motion.div
                key={q.name}
                className="qqueue__item"
                initial={{ opacity: 0, x: lang === 'ar' ? 12 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="qqueue__avatar" style={{ background: q.color }}>{q.initial}</span>
                <div className="qqueue__body">
                  <span className="qqueue__name">{q.name}</span>
                  <span className="qqueue__text">{q.text}</span>
                </div>
                <button className="qqueue__answer" onClick={() => answer(q)}>{t.answerBtn}</button>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {role === 'student' && (
        <section className="panel">
          <p className="panel__label">
            <Icon name="hand" size={14} /> {t.studentLabel}
          </p>
          <CameraCapture
            active={asking}
            onResult={() => setStudentDone(true)}
            resultText={t.studentResult}
            label={lang === 'ar' ? 'كاميرا الطالب' : 'Student camera'}
          />
        </section>
      )}

      <div className="live__actions">
        {role === 'student' && (
          <button
            className="advance advance--ghost"
            onClick={() => { setAsking((a) => !a); setStudentDone(false) }}
          >
            <Icon name="hand" size={16} />
            {asking ? t.hideBtn : t.askBtn}
          </button>
        )}
        <button className="advance" onClick={() => onNav(role === 'teacher' ? 'analytics' : 'library')}>
          {t.endBtn}
          <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={16} />
        </button>
      </div>
    </motion.main>
  )
}

/* ------------------------------ student lesson library ------------------------------ */

function Library({ t, lang, onNav, onHome }) {
  const [tab, setTab] = useState('all')
  const [favs, setFavs] = useState(() => new Set(t.items.map((it, i) => (it.fav ? i : null)).filter((v) => v !== null)))

  const toggleFav = (i) => {
    setFavs((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const items = t.items.map((it, i) => ({ ...it, fav: favs.has(i), idx: i }))
  const visible = tab === 'fav' ? items.filter((it) => it.fav) : items

  return (
    <motion.main className="screen library" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={onHome} aria-label={t.back}>
          <Icon name="arrowRight" size={18} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.sub}</span>
        </div>
      </header>

      <Avatar3D signId={['00_0253', '00_0113']} lang={lang} caption={LOCAL[lang].studentHi} compact badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'} />

      <div className="segmented">
        <button className={`segmented__btn ${tab === 'all' ? 'is-on' : ''}`} onClick={() => setTab('all')}>{t.tabAll}</button>
        <button className={`segmented__btn ${tab === 'fav' ? 'is-on' : ''}`} onClick={() => setTab('fav')}>{t.tabFav}</button>
      </div>

      <div className="list">
        {visible.map((item) => (
          <motion.button
            key={item.idx}
            className="list__row"
            onClick={() => onNav('session')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span className="list__icon"><Icon name="book" size={18} /></span>
            <div className="list__body">
              <span className="list__title">{item.subject}</span>
              <span className="list__meta">{item.time} · {item.mins}</span>
            </div>
            <span className="list__badge">{item.qs}</span>
            <span
              className={`list__fav ${item.fav ? 'is-fav' : ''}`}
              onClick={(e) => { e.stopPropagation(); toggleFav(item.idx) }}
            >
              <Icon name="heart" size={16} />
            </span>
          </motion.button>
        ))}
      </div>
    </motion.main>
  )
}

/* ------------------------------ analytics ------------------------------ */

function Analytics({ t, onNav }) {
  const max = Math.max(...t.weekValues)
  return (
    <motion.main className="screen analytics" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('dashboard')} aria-label={t.back}>
          <Icon name="arrowRight" size={18} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.sub}</span>
        </div>
      </header>

      <div className="chart-card">
        <p className="chart-card__title">{t.weeklyLabel}</p>
        <div className="bar-chart">
          {t.weekValues.map((v, i) => (
            <div className="bar-chart__col" key={i}>
              <motion.div
                className="bar-chart__bar"
                initial={{ height: 0 }}
                animate={{ height: `${(v / max) * 100}%` }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="bar-chart__label">{t.weekDays[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-card">
        <p className="chart-card__title">{t.topLabel}</p>
        <div className="leaderboard">
          {t.leaderboard.map((row, i) => (
            <div className="leaderboard__row" key={row.name}>
              <span className="leaderboard__rank">{i + 1}</span>
              <span className="leaderboard__name">{row.name}</span>
              <span className="leaderboard__value">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-card">
        <p className="chart-card__title">{t.replayLabel}</p>
        <div className="leaderboard">
          {t.replaySigns.map((row, i) => (
            <div className="leaderboard__row" key={row.word}>
              <span className="leaderboard__rank">{i + 1}</span>
              <span className="leaderboard__name">{row.word}</span>
              <span className="leaderboard__value">{row.count}×</span>
            </div>
          ))}
        </div>
      </div>
    </motion.main>
  )
}

/* ------------------------------ settings ------------------------------ */

function Settings({ t, lang, onToggleLang, onNav, onHome, switchLabel }) {
  const [style, setStyle] = useState(0)
  return (
    <motion.main className="screen settings" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={onHome} aria-label={t.back}>
          <Icon name="arrowRight" size={18} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
        </div>
      </header>

      <div className="field">
        <span className="field__label"><Icon name="school" size={15} /> {t.schoolLabel}</span>
        <span className="field__value">{t.school}</span>
      </div>

      <div className="field">
        <span className="field__label"><Icon name="avatar" size={15} /> {t.avatarLabel}</span>
        <div className="chips">
          {t.avatars.map((a, i) => (
            <button key={a} className={`chip chip--tap ${i === style ? 'is-on' : ''}`} onClick={() => setStyle(i)}>{a}</button>
          ))}
        </div>
      </div>

      <Avatar3D signId={signsFor('education')} lang={lang} accent={STYLE_ACCENTS[style]} compact badgeLive={LOCAL[lang].preview} />

      <div className="field">
        <span className="field__label"><Icon name="settings" size={15} /> {t.langLabel}</span>
        <button className="langbtn langbtn--inline" onClick={onToggleLang}>
          {lang === 'ar' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="badge-strip">
        <Icon name="check" size={14} /> {t.integration}
      </div>

      <button className="advance advance--ghost" style={{ marginTop: 16 }} onClick={onHome}>
        {switchLabel}
      </button>
    </motion.main>
  )
}

/* ------------------------------- tab bar ------------------------------- */

function TabBar({ t, role, screen, onNav }) {
  const tabs = role === 'teacher'
    ? [
        { key: 'dashboard', icon: 'school', label: t.dashboard },
        { key: 'session', icon: 'avatar', label: t.session },
        { key: 'analytics', icon: 'chart', label: t.analytics },
        { key: 'settings', icon: 'settings', label: t.settings },
      ]
    : [
        { key: 'library', icon: 'book', label: t.library },
        { key: 'session', icon: 'avatar', label: t.session },
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
          <Icon name={tab.icon} size={19} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

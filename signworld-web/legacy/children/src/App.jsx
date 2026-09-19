import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icons'
import { SaduField, Divider } from './Ornaments'
import SignWorldMark from './SignWorldMark'
import Avatar3D from './Avatar3D'
import Confetti from './Confetti'
import useLang from './useLang'
import { CONTENT, APP_NAME, MASCOTS, getCategories, getLessonWords } from './content'
import { signsFor, signsForText } from './signs'

const LOCAL = {
  ar: { hi: 'مرحبًا يا صديقي!', cheer: 'أحسنت يا بطل! شكرًا لك!' },
  en: { hi: 'Hi, friend!', cheer: 'Great job, champ! Thank you!' },
}
import './App.css'

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

const bounce = { type: 'spring', bounce: 0.5, duration: 0.65 }
const bigBounce = { type: 'spring', bounce: 0.62, duration: 0.8 }

function loadProfile() {
  try {
    const raw = localStorage.getItem('sw-children-profile')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function App() {
  const [profile, setProfile] = useState(loadProfile)
  const [screen, setScreen] = useState(profile ? 'home' : 'onboard')
  const [category, setCategory] = useState('family')
  const { lang, dir, t, toggle } = useLang(CONTENT)

  const saveProfile = (p) => {
    setProfile(p)
    try { localStorage.setItem('sw-children-profile', JSON.stringify(p)) } catch { /* ignore */ }
    setScreen('home')
  }

  const mascot = MASCOTS.find((m) => m.id === profile?.mascotId) ?? MASCOTS[0]

  return (
    <div className={`app app--${screen}`} dir={dir} style={{ '--accent': mascot.accent, '--accent-soft': mascot.accent }}>
      <SaduField />
      <div className="vignette" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {screen === 'onboard' && (
          <Onboard key="onboard" t={t.onboard} lang={lang} onDone={saveProfile} />
        )}
        {screen === 'home' && (
          <Home
            key="home"
            t={t.home}
            lang={lang}
            mascot={mascot}
            profile={profile}
            onToggleLang={toggle}
            onPick={setScreen}
            onChangeMascot={() => setScreen('onboard')}
          />
        )}
        {screen === 'categories' && (
          <Categories
            key="categories"
            t={t.categories}
            lang={lang}
            onNav={setScreen}
            onPickCategory={(id) => { setCategory(id); setScreen('lesson') }}
          />
        )}
        {screen === 'lesson' && (
          <Lesson key="lesson" t={t.lesson} lang={lang} category={category} mascot={mascot} onNav={setScreen} />
        )}
        {screen === 'game' && (
          <Game key="game" t={t.game} lang={lang} mascot={mascot} onNav={setScreen} />
        )}
        {screen === 'progress' && (
          <Progress key="progress" t={t.progress} lang={lang} onNav={setScreen} />
        )}
      </AnimatePresence>

      {['lesson', 'game', 'progress'].includes(screen) && (
        <TabBar t={t.nav} screen={screen} onNav={setScreen} />
      )}
    </div>
  )
}

/* ------------------------------- onboarding ------------------------------- */

function Onboard({ t, lang, onDone }) {
  const [mascotId, setMascotId] = useState(MASCOTS[0].id)
  const [name, setName] = useState('')

  return (
    <motion.main className="screen onboard" {...fade}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={bigBounce}
        style={{ textAlign: 'center', fontSize: 64, marginBottom: 4 }}
      >
        {MASCOTS.find((m) => m.id === mascotId)?.emoji}
      </motion.div>

      <motion.h1 className="onboard__title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
        {t.title}
      </motion.h1>
      <motion.p className="onboard__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
        {t.sub}
      </motion.p>

      <div className="mascot-grid">
        {MASCOTS.map((m, i) => (
          <motion.button
            key={m.id}
            className={`mascot-tile ${mascotId === m.id ? 'is-on' : ''}`}
            onClick={() => setMascotId(m.id)}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...bounce, delay: 0.05 * i }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="mascot-tile__emoji">{m.emoji}</span>
            <span className="mascot-tile__name">{m.name[lang]}</span>
          </motion.button>
        ))}
      </div>

      <motion.input
        className="name-input"
        placeholder={t.namePlaceholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        maxLength={18}
      />

      <motion.button
        className="advance"
        onClick={() => onDone({ mascotId, name: name.trim() })}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ...bounce }}
        whileTap={{ scale: 0.96 }}
      >
        {t.startBtn}
      </motion.button>
    </motion.main>
  )
}

/* ------------------------------- home ------------------------------- */

function Home({ t, lang, mascot, profile, onToggleLang, onPick, onChangeMascot }) {
  const title = profile?.name
    ? t.title.replace('{name}', profile.name)
    : t.titleFallback

  return (
    <motion.main className="screen home" {...fade}>
      <header className="topbar">
        <SignWorldMark app={APP_NAME[lang]} lang={lang} />
        <button className="langbtn" onClick={onToggleLang}>{lang === 'ar' ? 'EN' : 'ع'}</button>
      </header>

      <motion.button
        className="home__mascot"
        onClick={onChangeMascot}
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, ...bigBounce }}
        whileTap={{ scale: 0.94, rotate: -4 }}
        style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
        aria-label={t.changeMascot}
      >
        <Avatar3D signId={['00_0253', '00_0233']} lang={lang} caption={LOCAL[lang].hi} accent={mascot.accent} badgeLive={lang === 'ar' ? 'مرحبًا!' : 'Hello!'} />
      </motion.button>

      <motion.p className="home__eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}>
        {t.eyebrow}
      </motion.p>
      <motion.h1 className="home__title" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
        {title}
      </motion.h1>
      <motion.p className="home__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}>
        {t.subtitle}
      </motion.p>

      <div className="home__choices">
        {[
          { key: 'parent', icon: 'users', d: t.parent, delay: 0.55, target: 'progress' },
          { key: 'child', icon: 'hand', d: t.child, delay: 0.7, target: 'categories' },
        ].map(({ key, icon, d, delay, target }) => (
          <motion.button
            key={key}
            className={`gate gate--${key === 'child' ? 'student' : 'teacher'}`}
            onClick={() => onPick(target)}
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, ...bounce }}
            whileTap={{ scale: 0.95 }}
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

/* ------------------------------- categories ------------------------------- */

function Categories({ t, lang, onNav, onPickCategory }) {
  const categories = useMemo(() => getCategories(lang), [lang])

  return (
    <motion.main className="screen categories" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('home')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={18} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.subject}</span>
        </div>
      </header>

      <div className="category-grid">
        {categories.map((c, i) => (
          <motion.button
            key={c.id}
            className="category-tile"
            style={{ '--tile-bg': c.accent }}
            onClick={() => onPickCategory(c.id)}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...bounce, delay: i * 0.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <span className="category-tile__emoji">{c.emoji}</span>
            <span className="category-tile__title">{c.title}</span>
            <span className="category-tile__count">{c.count} {t.wordsCount}</span>
          </motion.button>
        ))}
      </div>
    </motion.main>
  )
}

/* ------------------------------- lesson ------------------------------- */

function Lesson({ t, lang, category, mascot, onNav }) {
  const words = useMemo(() => getLessonWords(category, lang), [category, lang])
  const [idx, setIdx] = useState(0)
  const [replayKey, setReplayKey] = useState(0)
  const word = words[idx]

  // best-matching dataset clip for the word (cat → "Where is the cat?"); words the
  // dataset has no sign for get a stable everyday clip instead
  const wordSigns = useMemo(() => signsForText(word.en, 'kids'), [word.en])

  const play = () => setReplayKey((k) => k + 1)

  const isLast = idx === words.length - 1

  return (
    <motion.main className="screen lesson" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('categories')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={18} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
        </div>
        <span className="live__dot" aria-hidden="true" />
      </header>

      <div className="lesson__wordbar">
        <button className="iconbtn" onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0} aria-label={t.prevBtn}>
          <Icon name={lang === 'ar' ? 'next' : 'prev'} size={16} />
        </button>
        <div className="lesson__wordmeta">
          <span className="lesson__count">{t.wordLabel} · {idx + 1} {t.of} {words.length}</span>
          <span className="lesson__dots">
            {words.map((_, i) => <span key={i} className={i === idx ? 'is-on' : ''} />)}
          </span>
        </div>
        <button className="iconbtn" onClick={() => setIdx((i) => Math.min(words.length - 1, i + 1))} disabled={isLast} aria-label={t.nextBtn}>
          <Icon name={lang === 'ar' ? 'prev' : 'next'} size={16} />
        </button>
      </div>

      <section className="panel">
        <Avatar3D signId={wordSigns} lang={lang} caption={word.caption} accent={mascot.accent} replayKey={replayKey} badgeLive={lang === 'ar' ? 'يُشير الآن' : 'Signing now'} />
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="lesson__word-card"
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={bigBounce}
        >
          <span className="lesson__emoji">{word.emoji}</span>
          <p className="lesson__word-ar arabic">{word.ar}</p>
          <p className="lesson__word-en">{word.en}</p>
        </motion.div>
      </AnimatePresence>

      <motion.button className="lesson__replay" onClick={play} whileTap={{ scale: 0.92 }}>
        <Icon name="play" size={15} />
        {t.replay}
      </motion.button>

      <div className="lesson__nav">
        {isLast ? (
          <motion.button className="advance" onClick={() => onNav('game')} whileTap={{ scale: 0.96 }}>
            {t.finishBtn}
          </motion.button>
        ) : (
          <motion.button className="advance" onClick={() => setIdx((i) => Math.min(words.length - 1, i + 1))} whileTap={{ scale: 0.96 }}>
            {t.nextBtn}
            <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={16} />
          </motion.button>
        )}
      </div>
    </motion.main>
  )
}

/* ------------------------------- game ------------------------------- */

function Game({ t, lang, mascot, onNav }) {
  const [qIdx, setQIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [picked, setPicked] = useState(null)
  const [status, setStatus] = useState(null) // null | 'correct' | 'wrong'
  const [celebrate, setCelebrate] = useState(false)

  const finished = qIdx >= t.items.length
  const item = !finished ? t.items[qIdx] : null
  const feedback = useMemo(
    () => (item ? t.correctFeedback[qIdx % t.correctFeedback.length] : ''),
    [qIdx, item, t.correctFeedback]
  )

  const pick = (choice) => {
    if (status === 'correct') return
    setPicked(choice.label)
    if (choice.label === item.answer) {
      setStatus('correct')
      setScore((s) => s + 10)
      setStreak((s) => s + 1)
      setCelebrate(true)
      setTimeout(() => setCelebrate(false), 1300)
    } else {
      setStatus('wrong')
      setStreak(0)
    }
  }

  const next = () => {
    setQIdx((i) => i + 1)
    setPicked(null)
    setStatus(null)
  }

  const restart = () => {
    setQIdx(0)
    setScore(0)
    setStreak(0)
    setPicked(null)
    setStatus(null)
  }

  return (
    <motion.main className="screen game" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('home')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={18} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.subject}</span>
        </div>
      </header>

      <div className="game__scorebar">
        <motion.span className="game__pill game__pill--score" animate={celebrate ? { scale: [1, 1.25, 1] } : {}} transition={bounce}>
          <Icon name="star" size={14} /> {t.scoreLabel}: {score}
        </motion.span>
        <motion.span className="game__pill game__pill--streak" animate={celebrate ? { scale: [1, 1.25, 1] } : {}} transition={{ ...bounce, delay: 0.05 }}>
          <Icon name="flame" size={14} /> {t.streakLabel}: {streak}
        </motion.span>
      </div>

      <AnimatePresence>{celebrate && <Confetti />}</AnimatePresence>

      <AnimatePresence mode="wait">
        {finished ? (
          <motion.div
            key="done"
            className="game__prompt"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={bigBounce}
          >
            <span className="game__prompt-emoji">🏆</span>
            <p className="game__prompt-word" style={{ marginBottom: 8 }}>{t.doneTitle}</p>
            <p style={{ color: 'var(--ink-dim)', fontWeight: 600, fontSize: 14, margin: '0 0 18px' }}>{t.doneBody}</p>
            <button className="advance advance--teal" onClick={restart}>
              <Icon name="sparkle" size={16} />
              {t.restartBtn}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={qIdx}
            initial={{ opacity: 0, x: lang === 'ar' ? -18 : 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === 'ar' ? 18 : -18 }}
            transition={{ duration: 0.35 }}
          >
            <Avatar3D
              signId={signsForText(item.answer, 'kids')}
              lang={lang}
              caption=""
              compact
              accent={mascot.accent}
              badgeLive={t.promptLabel}
            />

            <div className="game__prompt">
              <p className="game__prompt-label">{t.promptLabel}</p>
              <motion.span
                className="game__prompt-emoji"
                animate={{ rotate: [0, -6, 6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'block' }}
              >
                {item.emoji}
              </motion.span>
              <p className="game__prompt-word">{item.prompt}</p>
            </div>

            <div className="quiz-grid">
              {item.choices.map((choice) => {
                const isPicked = picked === choice.label
                const isAnswer = choice.label === item.answer
                const cls =
                  status && isPicked && status === 'correct' ? 'is-correct'
                    : status && isPicked && status === 'wrong' ? 'is-wrong'
                      : status === 'correct' && isAnswer ? 'is-correct' : ''
                return (
                  <motion.button
                    key={choice.label}
                    className={`quiz-card ${cls}`}
                    onClick={() => pick(choice)}
                    disabled={status === 'correct'}
                    whileTap={{ scale: 0.96 }}
                    animate={isPicked ? { scale: [1, 1.06, 1], rotate: status === 'wrong' ? [0, -2, 2, 0] : 0 } : {}}
                    transition={bounce}
                  >
                    <span className="quiz-card__emoji">{choice.emoji}</span>
                    <span className="quiz-card__label">{choice.label}</span>
                    {cls === 'is-correct' && (
                      <span className="quiz-card__check"><Icon name="check" size={18} /></span>
                    )}
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence>
              {status && (
                <motion.div
                  className={`game__feedback ${status === 'correct' ? 'game__feedback--good' : 'game__feedback--retry'}`}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={bigBounce}
                >
                  {status === 'correct' ? feedback : t.wrongFeedback}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {status === 'correct' && !finished && (
        <div className="lesson__nav">
          <motion.button className="advance" onClick={next} whileTap={{ scale: 0.96 }}>
            {t.nextBtn}
            <Icon name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'} size={16} />
          </motion.button>
        </div>
      )}
    </motion.main>
  )
}

/* ------------------------------ progress ------------------------------ */

function Progress({ t, lang, onNav }) {
  return (
    <motion.main className="screen progress" {...fade}>
      <header className="journey__bar">
        <button className="iconbtn" onClick={() => onNav('home')} aria-label={t.back}>
          <Icon name={lang === 'ar' ? 'arrowRight' : 'arrowLeft'} size={18} />
        </button>
        <div className="live__heading">
          <span className="live__title">{t.title}</span>
          <span className="live__subject">{t.subject}</span>
        </div>
      </header>

      <motion.div className="streak-card" initial={{ opacity: 0, y: 14, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={bigBounce}>
        <motion.span
          className="streak-card__icon"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon name="flame" size={26} />
        </motion.span>
        <div>
          <div className="streak-card__num">{t.streakNum}</div>
          <div className="streak-card__label">{t.streakLabel}</div>
        </div>
      </motion.div>

      <Avatar3D signId={['00_0251', '00_0233']} lang={lang} caption={LOCAL[lang].cheer} compact badgeLive={lang === 'ar' ? 'أحسنت!' : 'Well done!'} />

      <p className="panel__label">{t.badgesLabel}</p>
      <div className="badge-grid">
        {t.badges.map((badge, i) => (
          <motion.div
            key={badge.title}
            className={`badge-tile ${badge.earned ? 'is-earned' : 'is-locked'}`}
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ ...bigBounce, delay: i * 0.06 }}
          >
            <span className="badge-tile__icon">
              <Icon name={badge.earned ? badge.icon : 'lock'} size={22} />
            </span>
            <span className="badge-tile__title">{badge.title}</span>
          </motion.div>
        ))}
      </div>

      <div className="parent-note">
        <span className="parent-note__icon"><Icon name="clock" size={18} /></span>
        <div>
          <p className="parent-note__title">{t.parentTitle}</p>
          <p className="parent-note__body">{t.parentBody}</p>
        </div>
      </div>
    </motion.main>
  )
}

/* ------------------------------- tab bar ------------------------------- */

function TabBar({ t, screen, onNav }) {
  const tabs = [
    { key: 'lesson', icon: 'book', label: t.lesson, target: 'categories' },
    { key: 'game', icon: 'sparkle', label: t.game, target: 'game' },
    { key: 'progress', icon: 'trophy', label: t.progress, target: 'progress' },
  ]
  return (
    <nav className="tabbar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tabbar__btn ${screen === tab.key ? 'is-on' : ''}`}
          onClick={() => onNav(tab.target)}
        >
          <Icon name={tab.icon} size={19} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

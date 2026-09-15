import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import Header from '../components/Header'
import Segmented from '../components/Segmented'
import CameraCapture from '../components/CameraCapture'
import Avatar2D from '../components/Avatar2D'
import { TRANSLATION_SCRIPTS } from '../content'

// simple speech synthesis helper (real + free browser API)
function speak(text, lang) {
  try {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang === 'ar' ? 'ar-SA' : 'en-US'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(u)
  } catch { /* ignore */ }
}

export default function Translate(props) {
  const { lang, dir, t, toggleLang, params } = props
  const MODES = ['sign2text', 'text2sign']
  const [mode, setMode] = useState(MODES.includes(params.mode) ? params.mode : 'sign2text')

  useEffect(() => {
    if (MODES.includes(params.mode)) setMode(params.mode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.mode])

  return (
    <>
      <Header lang={lang} dir={dir} title={t.translate.title} onToggleLang={toggleLang} />

      <Segmented
        options={[
          { id: 'sign2text', label: t.translate.modeSign2Text },
          { id: 'text2sign', label: t.translate.modeText2Sign },
        ]}
        value={mode}
        onChange={setMode}
      />

      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {mode === 'sign2text' && <Sign2Text {...props} />}
          {mode === 'text2sign' && <Text2Sign {...props} />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

/* ------------------------------- Sign -> Text ------------------------------- */

function Sign2Text({ lang, t, addHistory }) {
  const [recording, setRecording] = useState(false)
  const [lines, setLines] = useState([])
  const [facing, setFacing] = useState('user')
  const cameraRef = useRef(null)
  const loggedRef = useRef(false)
  const script = TRANSLATION_SCRIPTS.sign2text.general[lang]

  const toggle = () => {
    if (recording) {
      setRecording(false)
      cameraRef.current?.processFrames?.()
    } else {
      setLines([])
      loggedRef.current = false
      setRecording(true)
    }
  }

  const fullText = lines.join(' ')

  const onComplete = () => {
    setRecording(false)
    if (!loggedRef.current && lines.length) {
      loggedRef.current = true
      addHistory({ kind: 'sign2text', title: lines[0], detail: lines.join(' ') })
    }
  }

  // log when we stop manually with content
  useEffect(() => {
    if (!recording && lines.length && !loggedRef.current) {
      loggedRef.current = true
      addHistory({ kind: 'sign2text', title: lines[0], detail: lines.join(' ') })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recording])

  return (
    <div className="tmode">
      <CameraCapture
        ref={cameraRef}
        active={recording}
        lines={script}
        onLine={(l) => setLines((prev) => [...prev, l])}
        onComplete={onComplete}
        facingMode={facing}
        label={recording ? t.translate.reading : (lang === 'ar' ? 'الكاميرا' : 'Camera')}
        processingLabel={lang === 'ar' ? 'جارٍ التعرّف على الإشارة…' : 'Recognizing sign…'}
        deniedLabel={t.translate.cameraDenied}
      />

      <div className="tmode__row">
        <button className="chipbtn" onClick={() => setFacing((f) => (f === 'user' ? 'environment' : 'user'))}>
          <Icon name="swap" size={14} /> {t.translate.switchCam}
        </button>
      </div>

      <button className={`btn ${recording ? 'btn--stop' : 'btn--primary'}`} onClick={toggle}>
        <Icon name={recording ? 'pause' : 'record'} size={16} />
        {recording ? t.translate.stop : t.translate.record}
      </button>

      <p className="tmode__label">{t.translate.transcript}</p>
      <div className="transcript-box">
        {lines.length === 0 ? (
          <p className="transcript-box__empty">{t.translate.transcriptEmpty}</p>
        ) : (
          lines.map((l, i) => (
            <motion.p key={i} className="transcript-line" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>{l}</motion.p>
          ))
        )}
      </div>

      {lines.length > 0 && (
        <div className="tmode__row">
          <button className="chipbtn" onClick={() => speak(fullText, lang)}><Icon name="speaker" size={14} /> {t.translate.speak}</button>
          <button className="chipbtn" onClick={() => navigator.clipboard?.writeText(fullText)}><Icon name="copy" size={14} /> {t.translate.copy}</button>
        </div>
      )}
    </div>
  )
}

/* ------------------------------- Text -> Sign ------------------------------- */

function Text2Sign({ lang, t, addHistory }) {
  const [text, setText] = useState('')
  const [signing, setSigning] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [readAloud, setReadAloud] = useState(false)
  const [glossTokens, setGlossTokens] = useState([])
  const [lookupError, setLookupError] = useState('')
  const timerRef = useRef(null)

  const startMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setLookupError(lang === 'ar' ? 'الإملاء الصوتي غير مدعوم في هذا المتصفح' : 'Dictation is not supported in this browser')
      return
    }
    const rec = new SR()
    rec.lang = lang === 'ar' ? 'ar-SA' : 'en-US'
    rec.onresult = (e) => setText(e.results[0][0].transcript)
    rec.start()
  }

  // Text2Sign is disconnected from the backend - it signs any typed text
  // (no exact-match lookup), using the hardcoded avatar animation.
  const run = (value) => {
    const v = value ?? text
    if (!v.trim()) return

    setLookupError('')
    addHistory({ kind: 'text2sign', title: v.slice(0, 40), detail: v })

    if (readAloud) speak(v, lang)
    const tokens = v.trim().split(/\s+/)
    setGlossTokens(tokens)
    setSigning(true)
    const tokenDurationMs = Math.max(300, 3600 / speed / tokens.length)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setSigning(false), tokenDurationMs * tokens.length)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <div className="tmode">
      <Avatar2D
        playing={signing}
        caption={glossTokens.length > 0 ? glossTokens.join(' ') : ''}
        badgeIdle={lang === 'ar' ? 'جاهز' : 'Idle'}
        badgeLive={lang === 'ar' ? 'يُترجم الآن' : 'Signing'}
      />

      <textarea
        className="tmode__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.translate.textPlaceholder}
        rows={3}
      />

      <div className="tmode__row">
        <button className="chipbtn" onClick={startMic}><Icon name="mic" size={14} /> {lang === 'ar' ? 'إملاء' : 'Dictate'}</button>
      </div>

      {lookupError && <p style={{ color: '#c74a30', fontSize: '0.9rem' }}>{lookupError}</p>}

      <div className="tmode__controls">
        <label className="ctl">
          <span className="ctl__label">{t.translate.speed} · {speed.toFixed(1)}×</span>
          <input type="range" min="0.5" max="1.5" step="0.1" value={speed} onChange={(e) => setSpeed(+e.target.value)} />
        </label>

        <label className="ctl ctl--switch">
          <span className="ctl__label">{t.translate.readAloud}</span>
          <input type="checkbox" checked={readAloud} onChange={(e) => setReadAloud(e.target.checked)} />
        </label>
      </div>

      <button className="btn btn--primary" onClick={() => run()}>
        <Icon name="avatar" size={16} /> {t.translate.sign}
      </button>
    </div>
  )
}

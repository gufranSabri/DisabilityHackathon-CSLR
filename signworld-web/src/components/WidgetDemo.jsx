import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import CameraCapture from './CameraCapture'
import Avatar3D from './Avatar3D'
import { useL } from '../useLangCtx'
import { WIDGET } from '../content'
import { signsForText } from '../lib/signs'

function speak(text, lang) {
  try {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang === 'ar' ? 'ar-SA' : 'en-US'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(u)
  } catch { /* ignore */ }
}

// The embeddable Sign2Text / Text2Sign demo — the same frame an institution
// would drop into their page. Recognition is simulated (same as the app).
export default function WidgetDemo({ theme = 'light', size = 'full', compact = false }) {
  const { lang, t } = useL()
  const w = t.widget
  const wd = t.widgetDemo
  const [mode, setMode] = useState('sign2text')

  return (
    <div className={`wdemo wdemo--${theme} wdemo--${size} ${compact ? 'wdemo--compact' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="wdemo__bar">
        <span className="wdemo__brand">
          <span className="wdemo__dot" /> SignWorld
        </span>
        <div className="wdemo__modes">
          <button className={mode === 'sign2text' ? 'is-on' : ''} onClick={() => setMode('sign2text')}>{w.modeSign}</button>
          <button className={mode === 'text2sign' ? 'is-on' : ''} onClick={() => setMode('text2sign')}>{w.modeText}</button>
        </div>
      </div>

      <div className="wdemo__body">
        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {mode === 'sign2text' ? <Sign2Text lang={lang} w={w} wd={wd} /> : <Text2Sign lang={lang} w={w} wd={wd} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Sign2Text({ lang, w, wd }) {
  const [rec, setRec] = useState(false)
  const [lines, setLines] = useState([])
  const script = WIDGET.demoScript[lang]

  const toggle = () => {
    if (rec) setRec(false)
    else { setLines([]); setRec(true) }
  }

  return (
    <div className="wdemo__pane">
      <CameraCapture
        active={rec}
        lines={script}
        onLine={(l) => setLines((p) => [...p, l])}
        onStop={() => setRec(false)}
        onComplete={() => setRec(false)}
        processingLabel={wd.reading}
        facingMode="user"
        label={rec ? wd.reading : 'SignWorld'}
        deniedLabel={wd.cameraDenied}
        retryLabel={wd.retryCamera}
      />
      <button className={`btn ${rec ? 'btn--stop' : 'btn--primary'} btn--sm`} onClick={toggle}>
        <Icon name={rec ? 'pause' : 'record'} size={14} /> {rec ? w.stop : w.record}
      </button>
      <div className="wdemo__transcript">
        {lines.length === 0
          ? <span className="wdemo__hint">{w.textPlaceholder}</span>
          : lines.map((l, i) => <p key={i}>{l}</p>)}
      </div>
      {lines.length > 0 && (
        <button className="wdemo__speak" onClick={() => speak(lines.join(' '), lang)}>
          <Icon name="speaker" size={13} /> {lang === 'ar' ? 'استماع' : 'Listen'}
        </button>
      )}
    </div>
  )
}

function Text2Sign({ lang, w }) {
  const phrases = WIDGET.phrases[lang]
  const [text, setText] = useState('')
  // the avatar is never idle: it starts on the first sample phrase
  const [spoken, setSpoken] = useState(() => ({ text: phrases[0], ids: signsForText(phrases[0], 'greeting') }))

  // keep the sample phrase in the UI language when it is still the default
  useEffect(() => {
    setSpoken((s) => (WIDGET.phrases.ar.includes(s.text) || WIDGET.phrases.en.includes(s.text))
      ? { text: phrases[0], ids: s.ids } : s)
  }, [lang])

  const run = (v) => {
    const val = (v ?? text).trim()
    if (!val) return
    setSpoken({ text: val, ids: signsForText(val, 'greeting') })
  }

  return (
    <div className="wdemo__pane">
      <Avatar3D
        signId={spoken.ids}
        lang={lang}
        caption={spoken.text}
        badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'}
      />
      <textarea
        className="wdemo__input"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={w.textPlaceholder}
      />
      <div className="wdemo__phrases">
        {phrases.map((p) => (
          <button key={p} onClick={() => { setText(p); run(p) }}>{p}</button>
        ))}
      </div>
      <button className="btn btn--primary btn--sm" onClick={() => run()}>
        <Icon name="avatar" size={14} /> {w.sign}
      </button>
    </div>
  )
}

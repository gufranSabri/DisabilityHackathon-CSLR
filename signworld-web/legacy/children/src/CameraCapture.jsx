import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icons'

// Stand-in for the Brain's Sign -> Text/Speech input. Shows the real camera
// (getUserMedia) when allowed, else a viewfinder. While `active` it records
// for `durationMs` (5 s, with a visible countdown), pretends to recognise for
// a moment, then shows the hardcoded `resultText` and calls `onResult`.
export default function CameraCapture({
  active = false,
  onResult,
  resultText = '',
  durationMs = 5000,
  processingMs = 900,
  accent = 'var(--marigold-soft)',
  label = 'Camera',
  statusText = 'يلتقط الإشارة… Reading sign…',
  processingText = 'يحلّل الإشارة… Recognising…',
}) {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [phase, setPhase] = useState('idle') // idle -> capturing -> processing -> done
  const [elapsed, setElapsed] = useState(0)
  const resultRef = useRef(onResult)
  resultRef.current = onResult

  // real camera when available (the host page grants it to this iframe)
  useEffect(() => {
    let cancelled = false
    let local = null
    ;(async () => {
      if (!navigator.mediaDevices?.getUserMedia) return
      try {
        local = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
        if (cancelled) { local.getTracks().forEach((t) => t.stop()); return }
        setStream(local)
      } catch { /* viewfinder fallback */ }
    })()
    return () => { cancelled = true; local?.getTracks().forEach((t) => t.stop()) }
  }, [])

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.play?.().catch(() => {})
    }
  }, [stream])

  useEffect(() => {
    if (!active) { setPhase('idle'); setElapsed(0); return }
    setPhase('capturing')
    setElapsed(0)
    const t0 = performance.now()
    let done
    const iv = setInterval(() => {
      const e = performance.now() - t0
      if (e >= durationMs) {
        clearInterval(iv)
        setElapsed(durationMs)
        setPhase('processing')
        done = setTimeout(() => { setPhase('done'); resultRef.current?.() }, processingMs)
      } else setElapsed(e)
    }, 100)
    return () => { clearInterval(iv); clearTimeout(done) }
  }, [active, durationMs, processingMs])

  const capturing = phase === 'capturing'

  return (
    <div className="camera" style={{ '--accent': accent }}>
      <div className="camera__frame">
        {stream && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
          />
        )}

        <span className="camera__corner camera__corner--tl" />
        <span className="camera__corner camera__corner--tr" />
        <span className="camera__corner camera__corner--bl" />
        <span className="camera__corner camera__corner--br" />

        {!stream && (
          <div className="camera__body">
            <Icon name={capturing ? 'hand' : 'camera'} size={30} />
          </div>
        )}

        {capturing && (
          <motion.span
            className="camera__scan"
            initial={{ top: '4%' }}
            animate={{ top: '96%' }}
            transition={{ duration: 1.1, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          />
        )}

        {capturing && (
          <span className="camera__rec is-on" style={{ left: 'auto', right: 8, transform: 'none' }}>
            {Math.max(0, Math.ceil((durationMs - elapsed) / 1000))}s
          </span>
        )}
        {capturing && (
          <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'rgba(255,255,255,0.2)' }}>
            <i style={{ display: 'block', height: '100%', width: `${Math.min(100, (elapsed / durationMs) * 100)}%`, background: 'var(--red, #e5533d)' }} />
          </span>
        )}

        <span className={`camera__rec ${capturing ? 'is-on' : ''}`}>
          <i /> {label}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {capturing && (
          <motion.p key="capturing" className="camera__status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {statusText}
          </motion.p>
        )}
        {phase === 'processing' && (
          <motion.p key="processing" className="camera__status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {processingText}
          </motion.p>
        )}
        {phase === 'done' && resultText && (
          <motion.p key="done" className="camera__transcript" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            {resultText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

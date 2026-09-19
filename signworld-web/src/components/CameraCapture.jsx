import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'

// Sign -> Text/Speech stand-in. Shows a REAL camera feed via getUserMedia
// behind the scan overlay when permission is granted; falls back to the SVG
// viewfinder (with a retry button) otherwise. Recognition itself is
// hardcoded: pressing record captures for `durationMs` (5 s, with a visible
// countdown), then a short "recognising" pause, then the caller's `lines`
// are revealed one at a time. Stopping early skips straight to the result.
export default function CameraCapture({
  active = false,
  lines = [],
  onLine,
  onComplete,
  onStop,
  durationMs = 5000,
  facingMode = 'user',
  lineIntervalMs = 800,
  processingMs = 900,
  processingLabel = 'Recognising sign…',
  accent = '#ffffff',
  label = 'Camera',
  deniedLabel = '',
  retryLabel = '',
}) {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [denied, setDenied] = useState(false)
  const [retryTick, setRetryTick] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [processing, setProcessing] = useState(false)
  const runningRef = useRef(false)
  const timersRef = useRef([])
  const cb = useRef({})
  cb.current = { onLine, onComplete, onStop, lines, lineIntervalMs, processingMs }

  // camera stream lifecycle — re-runs when facingMode changes or the user
  // taps "retry" (e.g. after dismissing the permission prompt by mistake,
  // or granting access in the browser's site settings mid-session).
  useEffect(() => {
    let cancelled = false
    let localStream = null
    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) { setDenied(true); return }
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode }, audio: false,
        })
        if (cancelled) { localStream.getTracks().forEach((t) => t.stop()); return }
        setStream(localStream)
        setDenied(false)
      } catch {
        if (!cancelled) setDenied(true)
      }
    }
    start()
    return () => {
      cancelled = true
      if (localStream) localStream.getTracks().forEach((t) => t.stop())
    }
  }, [facingMode, retryTick])

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      // Assigning srcObject imperatively doesn't reliably trigger playback
      // from the `autoPlay` attribute alone in every browser — kick it
      // explicitly. Failure here is silent/expected under stricter
      // autoplay policies; the corner brackets still show either way.
      videoRef.current.play?.().catch(() => {})
    }
  }, [stream])

  const clearTimers = () => {
    timersRef.current.forEach((t) => { clearTimeout(t); clearInterval(t) })
    timersRef.current = []
  }

  // recording -> processing -> reveal. Not cancelled when the parent flips
  // `active` off (that is how it stops us); only a new run or unmount clears it.
  const finish = (notifyParent) => {
    if (!runningRef.current) return
    runningRef.current = false
    clearTimers()
    setElapsed(0)
    if (notifyParent) cb.current.onStop?.()
    setProcessing(true)
    timersRef.current.push(setTimeout(() => {
      setProcessing(false)
      const { lines: ls, onLine: line, onComplete: done, lineIntervalMs: gap } = cb.current
      if (!ls.length) { done?.(); return }
      ls.forEach((l, i) => {
        timersRef.current.push(setTimeout(() => {
          line?.(l)
          if (i === ls.length - 1) done?.()
        }, i * gap))
      })
    }, cb.current.processingMs))
  }

  useEffect(() => {
    if (active && !runningRef.current) {
      clearTimers()
      setProcessing(false)
      runningRef.current = true
      const t0 = performance.now()
      setElapsed(0)
      timersRef.current.push(setInterval(() => {
        const e = performance.now() - t0
        if (e >= durationMs) finish(true)
        else setElapsed(e)
      }, 100))
    } else if (!active && runningRef.current) {
      finish(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(() => clearTimers, [])

  const showVideo = stream && !denied

  return (
    <div className="camera" style={{ '--accent': accent }}>
      <div className="camera__frame">
        {showVideo ? (
          <video
            ref={videoRef}
            className="camera__video"
            autoPlay
            playsInline
            muted
            style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
          />
        ) : (
          <div className="camera__body">
            <Icon name={active ? 'hand' : 'camera'} size={32} />
          </div>
        )}

        <span className="camera__corner camera__corner--tl" />
        <span className="camera__corner camera__corner--tr" />
        <span className="camera__corner camera__corner--bl" />
        <span className="camera__corner camera__corner--br" />

        {active && (
          <span className="camera__timer">{Math.max(0, Math.ceil((durationMs - elapsed) / 1000))}s</span>
        )}
        {active && (
          <span className="camera__progress"><i style={{ width: `${Math.min(100, (elapsed / durationMs) * 100)}%` }} /></span>
        )}

        {processing && (
          <div className="camera__processing">
            <span className="camera__spinner" />
            <span>{processingLabel}</span>
          </div>
        )}

        {active && (
          <motion.span
            className="camera__scan"
            initial={{ top: '4%' }}
            animate={{ top: '96%' }}
            transition={{ duration: 1.1, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          />
        )}

        <span className={`camera__rec ${active ? 'is-on' : ''}`}>
          <i /> {label}
        </span>
      </div>

      <AnimatePresence>
        {denied && (deniedLabel || retryLabel) && (
          <motion.div
            key="denied"
            className="camera__status camera__status--denied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {deniedLabel && <p>{deniedLabel}</p>}
            {retryLabel && (
              <button type="button" className="camera__retry" onClick={() => setRetryTick((n) => n + 1)}>
                <Icon name="camera" size={13} /> {retryLabel}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

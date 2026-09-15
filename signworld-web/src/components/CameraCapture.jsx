import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'

// Sign -> Text/Speech stand-in. Shows a REAL camera feed via getUserMedia
// behind the scan overlay when permission is granted; falls back to the SVG
// viewfinder (with a retry button) otherwise. Recognition itself is
// simulated: while `active`, the component emits transcript lines from
// `lines` one at a time on a timer.
export default function CameraCapture({
  active = false,
  lines = [],
  onLine,
  onComplete,
  facingMode = 'user',
  lineIntervalMs = 1900,
  accent = '#ffffff',
  label = 'Camera',
  deniedLabel = '',
  retryLabel = '',
}) {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [denied, setDenied] = useState(false)
  const [retryTick, setRetryTick] = useState(0)
  const idxRef = useRef(0)

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

  // simulated recognition: reveal lines while active
  useEffect(() => {
    if (!active) { idxRef.current = 0; return }
    idxRef.current = 0
    const tick = () => {
      if (idxRef.current >= lines.length) { onComplete?.(); return }
      onLine?.(lines[idxRef.current])
      idxRef.current += 1
      if (idxRef.current >= lines.length) onComplete?.()
    }
    const first = setTimeout(tick, lineIntervalMs)
    const iv = setInterval(tick, lineIntervalMs)
    return () => { clearTimeout(first); clearInterval(iv) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

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

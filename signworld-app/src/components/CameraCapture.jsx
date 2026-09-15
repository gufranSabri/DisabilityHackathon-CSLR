import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'

// Sign -> Text/Speech stand-in. Shows a REAL camera feed via getUserMedia
// behind the scan overlay when permission is granted; falls back to the SVG
// viewfinder otherwise. Recognition is fully hardcoded (no backend): while
// `active` the camera just shows the scanning overlay; once stopped, a brief
// "processing" delay plays, then the caller's `lines` are revealed one at a
// time to simulate live recognition.
const CameraCapture = forwardRef(({
  active = false,
  autoPlay = false,
  lines = [],
  onLine,
  onComplete,
  facingMode = 'user',
  lineIntervalMs = 1100,
  processingMs = 1100,
  accent = '#ffffff',
  label = 'Camera',
  processingLabel = 'Processing…',
  deniedLabel = '',
}, ref) => {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [denied, setDenied] = useState(false)
  const [processing, setProcessing] = useState(false)
  const timersRef = useRef([])

  // camera stream lifecycle
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
  }, [facingMode])

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream
  }, [stream])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  // Runs the hardcoded "processing -> reveal lines" sequence on demand
  // (called by the parent once it stops recording). Deliberately does NOT
  // get cancelled by `active` flipping to false - the parent stops
  // recording and triggers this in the same action, and the reveal must
  // survive that (only a fresh recording start, or unmount, cancels it).
  const processFrames = () => {
    clearTimers()
    setProcessing(true)
    const revealStart = setTimeout(() => {
      setProcessing(false)
      lines.forEach((line, i) => {
        const t = setTimeout(() => {
          onLine?.(line)
          if (i === lines.length - 1) onComplete?.()
        }, i * lineIntervalMs)
        timersRef.current.push(t)
      })
      if (lines.length === 0) onComplete?.()
    }, processingMs)
    timersRef.current.push(revealStart)
  }

  useEffect(() => {
    if (active) {
      // A fresh recording started - cancel any still-pending reveal from a
      // previous run before starting clean.
      clearTimers()
      setProcessing(false)
      if (autoPlay) processFrames()
    }
    // Cleanup only matters on unmount here - clearing on every `active`
    // change would also cancel the reveal `processFrames()` just scheduled
    // when the parent flips `active` to false to stop recording.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(() => clearTimers, [])

  useImperativeHandle(ref, () => ({
    processFrames,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [lines, lineIntervalMs, processingMs])

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

        {processing && (
          <div className="camera__processing">
            <span className="camera__spinner" />
            <span>{processingLabel}</span>
          </div>
        )}

        <span className={`camera__rec ${active ? 'is-on' : ''}`}>
          <i /> {label}
        </span>
      </div>

      <AnimatePresence>
        {denied && deniedLabel && (
          <motion.p
            key="denied"
            className="camera__status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {deniedLabel}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})

export default CameraCapture

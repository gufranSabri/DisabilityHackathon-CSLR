import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icons'

// Stand-in for the Brain's Sign -> Text/Speech input: a fake camera
// viewfinder that "captures" signing and resolves to a transcript after
// a delay, simulating real-time recognition without any real ML/video.
// Here it doubles as the "watch me sign back!" mini-game interaction.
export default function CameraCapture({
  active = false,
  onResult,
  resultText = '',
  statusText = 'يلتقط الإشارة… Reading sign…',
  delayMs = 1800,
  accent = 'var(--marigold-soft)',
  label = 'Camera',
}) {
  const [phase, setPhase] = useState('idle') // idle -> capturing -> done

  useEffect(() => {
    if (!active) {
      setPhase('idle')
      return
    }
    setPhase('capturing')
    const t = setTimeout(() => {
      setPhase('done')
      onResult?.()
    }, delayMs)
    return () => clearTimeout(t)
  }, [active, delayMs, onResult])

  return (
    <div className="camera" style={{ '--accent': accent }}>
      <div className="camera__frame">
        <span className="camera__corner camera__corner--tl" />
        <span className="camera__corner camera__corner--tr" />
        <span className="camera__corner camera__corner--bl" />
        <span className="camera__corner camera__corner--br" />

        <div className="camera__body">
          <Icon name={phase === 'capturing' ? 'hand' : 'camera'} size={30} />
        </div>

        {phase === 'capturing' && (
          <motion.span
            className="camera__scan"
            initial={{ y: '0%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          />
        )}

        <span className={`camera__rec ${phase === 'capturing' ? 'is-on' : ''}`}>
          <i /> {label}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'capturing' && (
          <motion.p
            key="capturing"
            className="camera__status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {statusText}
          </motion.p>
        )}
        {phase === 'done' && resultText && (
          <motion.p
            key="done"
            className="camera__transcript"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {resultText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

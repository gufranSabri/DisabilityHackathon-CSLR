import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// One ECG beat as a repeating tile: flat line, small p-wave bump, sharp QRS
// spike, t-wave bump, flat again. Repeated across the width via <use>.
const BEAT = 'M0,30 L14,30 L18,22 L22,30 L28,30 L32,4 L36,52 L40,30 L48,30 L56,20 L64,30 L100,30'

function EcgWave({ color = 'var(--accent)' }) {
  return (
    <svg className="vitals__ecg" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="ecg-beat" width="100" height="60" patternUnits="userSpaceOnUse">
          <path d={BEAT} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </pattern>
      </defs>
      <motion.rect
        x="-100" y="0" width="500" height="60"
        fill="url(#ecg-beat)"
        animate={{ x: [-100, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      />
      <rect x="0" y="0" width="6" height="60" fill="var(--panel, #020a07)" />
    </svg>
  )
}

// A live-reading vitals strip: animated ECG trace plus HR / BP / SpO2 numbers
// that jitter gently within a plausible range, standing in for a real bedside
// monitor feed. Purely cosmetic — no real sensor data.
export default function VitalsMonitor({ labels, hr = 78, spo2 = 98, bp = '118/76' }) {
  const [displayHr, setDisplayHr] = useState(hr)

  useEffect(() => {
    const id = setInterval(() => {
      setDisplayHr(hr + Math.round((Math.random() - 0.5) * 4))
    }, 1200)
    return () => clearInterval(id)
  }, [hr])

  return (
    <div className="vitals">
      <EcgWave />
      <div className="vitals__row">
        <div className="vitals__stat">
          <span className="vitals__stat-label">{labels.hr}</span>
          <span className="vitals__stat-value is-hr mono">
            {displayHr}<span className="vitals__stat-unit">bpm</span>
          </span>
        </div>
        <div className="vitals__stat">
          <span className="vitals__stat-label">{labels.spo2}</span>
          <span className="vitals__stat-value is-spo2 mono">
            {spo2}<span className="vitals__stat-unit">%</span>
          </span>
        </div>
        <div className="vitals__stat">
          <span className="vitals__stat-label">{labels.bp}</span>
          <span className="vitals__stat-value mono" style={{ fontSize: 16 }}>
            {bp}
          </span>
        </div>
      </div>
    </div>
  )
}

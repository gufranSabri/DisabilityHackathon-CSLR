import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import CameraCapture from './CameraCapture'
import AvatarStage from './AvatarStage'
import { TRANSLATION_SCRIPTS } from '../content'

// Full-screen emergency overlay: countdown -> connecting -> active split view -> summary.
export default function SosFlow({ t, lang, profile, onClose, onLogged }) {
  const [phase, setPhase] = useState('countdown') // countdown | connecting | active | summary
  const [count, setCount] = useState(3)
  const [dispatchLines, setDispatchLines] = useState([])
  const [myLines, setMyLines] = useState([])
  const loggedRef = useRef(false)

  const dispatcher = TRANSLATION_SCRIPTS.dispatcher[lang]
  const mine = TRANSLATION_SCRIPTS.sign2text.medical[lang]

  // countdown
  useEffect(() => {
    if (phase !== 'countdown') return
    if (count === 0) { setPhase('connecting'); return }
    const id = setTimeout(() => setCount((c) => c - 1), 900)
    return () => clearTimeout(id)
  }, [phase, count])

  // connecting -> active
  useEffect(() => {
    if (phase !== 'connecting') return
    const id = setTimeout(() => setPhase('active'), 1600)
    return () => clearTimeout(id)
  }, [phase])

  // dispatcher lines drip in while active
  useEffect(() => {
    if (phase !== 'active') return
    let i = 0
    setDispatchLines([dispatcher[0]])
    i = 1
    const iv = setInterval(() => {
      if (i >= dispatcher.length) { clearInterval(iv); return }
      setDispatchLines((prev) => [...prev, dispatcher[i]])
      i += 1
    }, 2200)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const end = () => {
    if (!loggedRef.current) {
      loggedRef.current = true
      onLogged?.({ kind: 'sos', title: t.sos.summaryTitle, detail: t.sos.summaryBody })
    }
    setPhase('summary')
  }

  return (
    <motion.div
      className="sos-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {phase === 'countdown' && (
          <motion.div key="cd" className="sos-countdown" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
            <span className="sos-countdown__ring">{count === 0 ? <Icon name="phone" size={40} /> : count}</span>
            <p className="sos-countdown__title">{t.sos.countdownTitle}</p>
            <p className="sos-countdown__hint">{t.sos.countdownHint}</p>
            <button className="sos-btn sos-btn--ghost" onClick={onClose}>{t.sos.cancel}</button>
          </motion.div>
        )}

        {phase === 'connecting' && (
          <motion.div key="cn" className="sos-countdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className="sos-countdown__ring sos-countdown__ring--spin"><Icon name="siren" size={38} /></span>
            <p className="sos-countdown__title">{t.sos.connecting}</p>
          </motion.div>
        )}

        {phase === 'active' && (
          <motion.div key="ac" className="sos-active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="sos-active__status">
              <span className="sos-active__dot" /> {t.sos.connected}
            </div>

            <div className="sos-half sos-half--dispatcher">
              <p className="sos-half__label">{t.sos.dispatcherLabel}</p>
              <div className="sos-captions">
                {dispatchLines.map((l, i) => (
                  <motion.p key={i} className="sos-caption" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>{l}</motion.p>
                ))}
              </div>
            </div>

            <div className="sos-shared">
              <p className="sos-shared__title"><Icon name="check" size={13} /> {t.sos.sharedTitle}</p>
              <div className="sos-shared__chips">
                {profile.sos.shareLocation && <span className="sos-chip"><Icon name="location" size={12} /> {t.sos.sharedLocation}</span>}
                {profile.sos.attachMedical && <span className="sos-chip"><Icon name="cross" size={12} /> {t.sos.sharedMedical}</span>}
                <span className="sos-chip"><Icon name="hand" size={12} /> {t.sos.sharedMode}</span>
              </div>
              {profile.sos.notifyContacts && (
                <p className="sos-shared__sms"><Icon name="chat" size={12} /> {t.sos.smsSent}</p>
              )}
            </div>

            <div className="sos-guidance">
              <p className="sos-half__label">{t.sos.waitTitle}</p>
              <AvatarStage
                signing
                caption={t.sos.waitGuidance}
                compact
                accent="#ffffff"
                badgeIdle={lang === 'ar' ? 'جاهز' : 'Idle'}
                badgeLive={lang === 'ar' ? 'إرشادات' : 'Guidance'}
              />
            </div>

            <div className="sos-half sos-half--me">
              <p className="sos-half__label">{t.sos.youLabel}</p>
              <CameraCapture
                active
                autoPlay
                lines={mine}
                lineIntervalMs={2200}
                onLine={(l) => setMyLines((prev) => [...prev, l])}
                facingMode="user"
                accent="#f0a58c"
                label={lang === 'ar' ? 'أنت' : 'You'}
                deniedLabel=""
              />
              <div className="sos-captions">
                {myLines.map((l, i) => (
                  <motion.p key={i} className="sos-caption sos-caption--me" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{l}</motion.p>
                ))}
              </div>
            </div>

            <button className="sos-btn sos-btn--end" onClick={end}>{t.sos.end}</button>
          </motion.div>
        )}

        {phase === 'summary' && (
          <motion.div key="sm" className="sos-countdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className="sos-countdown__ring sos-countdown__ring--ok"><Icon name="check" size={40} /></span>
            <p className="sos-countdown__title">{t.sos.summaryTitle}</p>
            <p className="sos-countdown__hint">{t.sos.summaryBody}</p>
            <button className="sos-btn sos-btn--ghost" onClick={onClose}>{t.common.done}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

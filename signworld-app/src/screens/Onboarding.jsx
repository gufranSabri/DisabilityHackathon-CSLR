import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import AvatarStage from '../components/AvatarStage'

const SLIDE_ICONS = ['sparkle', 'camera', 'shield']

export default function Onboarding({ lang, dir, t, toggleLang, profile, updateProfile, onDone }) {
  const o = t.onboarding
  const [step, setStep] = useState(0)
  const total = o.slides.length + 1 // slides + name/comm setup
  const [name, setName] = useState(profile.name[lang] || '')
  const [comm, setComm] = useState(profile.commMode)

  const next = () => setStep((s) => Math.min(s + 1, total - 1))
  const finish = () => {
    const trimmed = name.trim()
    if (trimmed) updateProfile({ name: { ...profile.name, [lang]: trimmed } })
    updateProfile({ commMode: comm })
    onDone()
  }

  const onSetup = step === o.slides.length
  const slide = o.slides[step]

  return (
    <motion.main className="screen onb" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="onb__top">
        <div className="onb__dots">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`onb__dot ${i === step ? 'is-on' : ''} ${i < step ? 'is-done' : ''}`} />
          ))}
        </div>
        <button className="langbtn" onClick={toggleLang}>{lang === 'ar' ? 'EN' : 'ع'}</button>
      </div>

      <AnimatePresence mode="wait">
        {!onSetup ? (
          <motion.div key={`s${step}`} className="onb__body" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <span className="onb__icon"><Icon name={SLIDE_ICONS[step]} size={30} /></span>
            <h1 className="onb__title">{slide.title}</h1>
            <AvatarStage
              signing
              caption={slide.body}
              badgeIdle={lang === 'ar' ? 'جاهز' : 'Idle'}
              badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'}
            />
          </motion.div>
        ) : (
          <motion.div key="setup" className="onb__body" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <span className="onb__icon"><Icon name="user" size={30} /></span>
            <label className="field-edit" style={{ width: '100%' }}>
              <span className="field-edit__label">{o.nameLabel}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={o.namePlaceholder} />
            </label>
            <p className="field-edit__label" style={{ alignSelf: 'flex-start' }}>{o.commLabel}</p>
            <div className="opt-list" style={{ width: '100%' }}>
              {['ssl', 'text', 'voiceOff'].map((k) => (
                <button key={k} className={`opt-row ${comm === k ? 'is-on' : ''}`} onClick={() => setComm(k)}>
                  <Icon name={k === 'ssl' ? 'hand' : k === 'text' ? 'chat' : 'speaker'} size={18} />
                  {t.me.commModes[k]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="onb__actions">
        {!onSetup ? (
          <>
            <button className="btn btn--primary" onClick={next}>{o.next}</button>
            <button className="btn btn--ghost" onClick={onDone}>{o.skip}</button>
          </>
        ) : (
          <button className="btn btn--primary" onClick={finish}>{o.start}</button>
        )}
      </div>
    </motion.main>
  )
}

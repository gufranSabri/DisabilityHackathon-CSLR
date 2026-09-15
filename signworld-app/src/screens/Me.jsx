import { useEffect, useState } from 'react'
import Icon from '../Icons'
import Header from '../components/Header'
import DocumentAssistant from './DocumentAssistant'
import DeafChat from './DeafChat'
import Community from './Community'
import History from './History'

export default function Me(props) {
  const { top, pop } = props
  const name = top?.name

  if (name === 'medical') return <MedicalCard {...props} onBack={pop} />
  if (name === 'settings') return <Settings {...props} onBack={pop} />
  if (name === 'history') return <History {...props} onBack={pop} />
  if (name === 'docAssistant') return <DocumentAssistant {...props} onBack={pop} />
  if (name === 'deafChat' || name === 'chatThread') return <DeafChat {...props} onBack={pop} />
  if (name === 'community' || name === 'forumThread') return <Community {...props} onBack={pop} />
  return <MeRoot {...props} />
}

function MeRoot({ lang, dir, t, toggleLang, profile, push, openSos, updateSos }) {
  const m = t.me
  const med = profile.medical
  const rows = [
    { key: 'history', icon: 'clock' },
    { key: 'community', icon: 'users' },
    { key: 'deafChat', icon: 'chat' },
    { key: 'docAssistant', icon: 'doc' },
    { key: 'settings', icon: 'settings' },
  ]

  return (
    <>
      <Header lang={lang} dir={dir} title={m.title} onToggleLang={toggleLang} />

      <div className="id-card">
        <div className="id-card__top">
          <span className="id-card__avatar">{profile.name[lang].charAt(0)}</span>
          <div>
            <p className="id-card__name">{profile.name[lang]}</p>
            <p className="id-card__id">{profile.idMasked}</p>
          </div>
          <span className="id-card__glyph">
            <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true">
              <path d="M14 2 22 14 14 26 6 14Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14 9 18 14 14 19 10 14Z" fill="currentColor" />
            </svg>
          </span>
        </div>
        <div className="id-card__mode">
          <Icon name="hand" size={14} /> {m.commMode}: <b>{m.commModes[profile.commMode]}</b>
        </div>
        <p className="id-card__note">{m.responderNote}</p>
      </div>

      <div className="me-section">
        <div className="me-section__head">
          <p className="home-sectitle" style={{ margin: 0 }}>{m.medicalTitle}</p>
          <button className="chipbtn" onClick={() => push('medical')}>{m.editMedical}</button>
        </div>
        <div className="kv">
          <div className="kv__row"><span>{m.bloodType}</span><span>{med.bloodType}</span></div>
          <div className="kv__row"><span>{m.conditions}</span><span>{med.conditions[lang]}</span></div>
          <div className="kv__row"><span>{m.allergies}</span><span>{med.allergies[lang]}</span></div>
          <div className="kv__row"><span>{m.preferredHospital}</span><span>{med.preferredHospital[lang]}</span></div>
          <div className="kv__row"><span>{m.emergencyContact}</span><span>{med.emergencyContact[lang]}</span></div>
        </div>
      </div>

      <div className="me-section">
        <p className="home-sectitle">{m.sosSettingsTitle}</p>
        <SosSettings {...{ lang, t, profile }} updateSos={updateSos} />
      </div>

      <div className="me-menu">
        {rows.map((r) => (
          <button key={r.key} className="me-menu__row" onClick={() => push(r.key)}>
            <Icon name={r.icon} size={18} />
            <span>{m.menu[r.key]}</span>
            <Icon name={dir === 'rtl' ? 'chevronLeft' : 'chevronRight'} size={16} />
          </button>
        ))}
      </div>

      <button className="btn btn--stop" style={{ marginTop: 10 }} onClick={openSos}>
        <Icon name="sos" size={16} /> {t.sos.pill}
      </button>
    </>
  )
}

function SosSettings({ lang, t, profile, updateSos }) {
  const m = t.me
  const s = profile.sos
  return (
    <div className="kv">
      <div className="kv__row">
        <span>{m.sosNumber}</span>
        <div className="segmented segmented--sub" style={{ maxWidth: 140 }}>
          {['911', '937'].map((n) => (
            <button key={n} className={`segmented__btn ${s.number === n ? 'is-on' : ''}`} onClick={() => updateSos({ number: n })}>{n}</button>
          ))}
        </div>
      </div>
      {[
        ['shareLocation', m.shareLocation],
        ['attachMedical', m.attachMedical],
        ['notifyContacts', m.notifyContacts],
      ].map(([k, label]) => (
        <label key={k} className="kv__row kv__row--switch">
          <span>{label}</span>
          <input type="checkbox" checked={s[k]} onChange={(e) => updateSos({ [k]: e.target.checked })} />
        </label>
      ))}
    </div>
  )
}

function MedicalCard({ lang, dir, t, onBack, profile, updateMedical }) {
  const m = t.me
  const med = profile.medical
  const field = (key, label) => (
    <label className="field-edit">
      <span className="field-edit__label">{label}</span>
      <input
        value={med[key][lang]}
        onChange={(e) => updateMedical({ [key]: { ...med[key], [lang]: e.target.value } })}
      />
    </label>
  )
  return (
    <>
      <Header lang={lang} dir={dir} title={m.medicalTitle} onBack={onBack} />
      <label className="field-edit">
        <span className="field-edit__label">{m.bloodType}</span>
        <input value={med.bloodType} onChange={(e) => updateMedical({ bloodType: e.target.value })} />
      </label>
      {field('conditions', m.conditions)}
      {field('medications', m.medications)}
      {field('allergies', m.allergies)}
      {field('preferredHospital', m.preferredHospital)}
      {field('emergencyContact', m.emergencyContact)}
      <button className="btn btn--primary" onClick={onBack}>{t.common.save}</button>
    </>
  )
}

function Settings({ lang, dir, t, toggleLang, onBack, settings, updateSettings }) {
  const m = t.me
  const [installEvt, setInstallEvt] = useState(null)
  const [installed, setInstalled] = useState(
    window.matchMedia?.('(display-mode: standalone)').matches || false,
  )

  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setInstallEvt(e) }
    const onInstalled = () => { setInstalled(true); setInstallEvt(null) }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const doInstall = async () => {
    if (!installEvt) return
    installEvt.prompt()
    await installEvt.userChoice
    setInstallEvt(null)
  }

  return (
    <>
      <Header lang={lang} dir={dir} title={m.settingsTitle} onBack={onBack} />

      <div className="kv">
        <label className="kv__row">
          <span>{m.language}</span>
          <button className="langbtn langbtn--inline" onClick={toggleLang}>{lang === 'ar' ? 'العربية' : 'English'}</button>
        </label>
        <div className="kv__row">
          <span>{m.textSize}</span>
          <div className="segmented segmented--sub" style={{ maxWidth: 180 }}>
            {['sm', 'md', 'lg'].map((sz) => (
              <button key={sz} className={`segmented__btn ${settings.textSize === sz ? 'is-on' : ''}`} onClick={() => updateSettings({ textSize: sz })}>
                {m.textSizes[sz]}
              </button>
            ))}
          </div>
        </div>
        <label className="kv__row kv__row--switch">
          <span>{m.highContrast}</span>
          <input type="checkbox" checked={settings.highContrast} onChange={(e) => updateSettings({ highContrast: e.target.checked })} />
        </label>
        <label className="kv__row kv__row--switch">
          <span>{m.reduceMotion}</span>
          <input type="checkbox" checked={settings.reduceMotion} onChange={(e) => updateSettings({ reduceMotion: e.target.checked })} />
        </label>
        <label className="kv__row kv__row--switch"><span>{m.captionsDefault}</span><input type="checkbox" defaultChecked /></label>
        <label className="kv__row kv__row--switch"><span>{m.notifications}</span><input type="checkbox" defaultChecked /></label>
      </div>

      <div className="install-card">
        <div className="install-card__head">
          <span className="install-card__icon"><Icon name="download" size={18} /></span>
          <span className="install-card__title">{m.installTitle}</span>
        </div>
        <p className="install-card__body">{installed ? m.installed : m.installBody}</p>
        {!installed && (
          <button className="btn btn--primary" onClick={doInstall} disabled={!installEvt}>
            {m.installBtn}
          </button>
        )}
      </div>

      <div className="me-section">
        <p className="home-sectitle">{m.about}</p>
        <p className="about-body">{m.aboutBody}</p>
      </div>
    </>
  )
}

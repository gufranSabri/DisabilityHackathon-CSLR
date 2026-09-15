import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '../Icons'
import Header from '../components/Header'
import Segmented from '../components/Segmented'
import { BOOKING_TYPES, INTERPRETERS } from '../content'

const typeById = (id) => BOOKING_TYPES.find((x) => x.id === id) || BOOKING_TYPES[BOOKING_TYPES.length - 1]
const itpById = (id) => INTERPRETERS.find((x) => x.id === id)

function fmt(dt, lang) {
  const d = new Date(dt)
  const date = d.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
  const time = d.toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-GB', { hour: '2-digit', minute: '2-digit' })
  return `${date} · ${time}`
}

function downloadIcs(booking, lang) {
  const start = new Date(booking.dt)
  const end = new Date(start.getTime() + 60 * 60 * 1000)
  const stamp = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const title = typeById(booking.typeId).name[lang]
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//SignWorld//EN', 'BEGIN:VEVENT',
    `UID:${booking.id}@signworld`, `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
    `SUMMARY:${title} — SignWorld`, `LOCATION:${booking.location[lang]}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `signworld-${booking.id}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

export default function Bookings(props) {
  const { top, pop } = props
  if (top?.name === 'new') return <NewBooking {...props} onBack={pop} />
  if (top?.name === 'detail') return <BookingDetail {...props} onBack={pop} bookingId={top.params.id} />
  if (top?.name === 'directory') return <Directory {...props} onBack={pop} />
  return <BookingsRoot {...props} />
}

function BookingsRoot({ lang, dir, t, toggleLang, push, bookings }) {
  const [tab, setTab] = useState('upcoming')
  const upcoming = bookings.filter((b) => ['confirmed', 'pending'].includes(b.status))
    .sort((a, b) => new Date(a.dt) - new Date(b.dt))
  const past = bookings.filter((b) => ['completed', 'cancelled'].includes(b.status))
    .sort((a, b) => new Date(b.dt) - new Date(a.dt))
  const list = tab === 'upcoming' ? upcoming : past

  return (
    <>
      <Header
        lang={lang} dir={dir} title={t.bookings.title} onToggleLang={toggleLang}
        right={<button className="iconbtn" onClick={() => push('directory')} aria-label={t.bookings.directory}><Icon name="users" size={17} /></button>}
      />

      <button className="btn btn--primary" onClick={() => push('new')}>
        <Icon name="calendar" size={16} /> {t.bookings.newBooking}
      </button>

      <div style={{ height: 14 }} />
      <Segmented
        options={[{ id: 'upcoming', label: t.bookings.upcoming }, { id: 'past', label: t.bookings.past }]}
        value={tab} onChange={setTab}
      />

      {list.length === 0 && <p className="empty-note">{t.bookings.empty}</p>}
      <div className="bk-list">
        {list.map((b, i) => {
          const ty = typeById(b.typeId)
          const itp = itpById(b.interpreterId)
          return (
            <motion.button
              key={b.id} className="bk-card" onClick={() => push('detail', { id: b.id })}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            >
              <span className="bk-card__icon"><Icon name={ty.icon} size={18} /></span>
              <div className="bk-card__body">
                <span className="bk-card__title">{ty.name[lang]}</span>
                <span className="bk-card__meta">{fmt(b.dt, lang)}</span>
                <span className="bk-card__meta">{b.location[lang]} · {itp ? itp.name[lang] : t.bookings.wizard.anyInterpreter}</span>
              </div>
              <span className={`bk-card__status bk-card__status--${b.status}`}>{t.bookings.status[b.status]}</span>
            </motion.button>
          )
        })}
      </div>
    </>
  )
}

function BookingDetail({ lang, dir, t, onBack, bookings, cancel, bookingId, navigate }) {
  const b = bookings.find((x) => x.id === bookingId)
  if (!b) { onBack(); return null }
  const ty = typeById(b.typeId)
  const itp = itpById(b.interpreterId)

  return (
    <>
      <Header lang={lang} dir={dir} title={ty.name[lang]} onBack={onBack} />

      <div className="detail-hero" style={{ '--card-accent': '#8a6fd6' }}>
        <span className="detail-hero__icon"><Icon name={ty.icon} size={24} /></span>
        <p className="detail-hero__tagline">{fmt(b.dt, lang)}</p>
        <p className="detail-hero__body">{b.location[lang]}</p>
      </div>

      <div className="kv">
        <div className="kv__row"><span>{t.bookings.mode[b.mode]}</span><span>{b.langPair}</span></div>
        <div className="kv__row"><span>{itp ? itp.name[lang] : t.bookings.wizard.anyInterpreter}</span><span className={`bk-card__status bk-card__status--${b.status}`}>{t.bookings.status[b.status]}</span></div>
        {b.notes?.[lang] && <div className="kv__note">{b.notes[lang]}</div>}
      </div>

      <div className="detail-actions">
        <button className="btn btn--primary" onClick={() => downloadIcs(b, lang)}>
          <Icon name="download" size={15} /> {t.bookings.addToCalendar}
        </button>
        <button className="btn btn--ghost" onClick={() => navigate({ tab: 'me', screen: 'deafChat' })}>
          <Icon name="chat" size={15} /> {t.bookings.messageInterpreter}
        </button>
        {['confirmed', 'pending'].includes(b.status) && (
          <button className="btn btn--stop" onClick={() => { cancel(b.id); onBack() }}>
            {t.bookings.cancelBooking}
          </button>
        )}
        {['completed', 'cancelled'].includes(b.status) && (
          <button className="btn btn--ghost" onClick={() => navigate({ tab: 'bookings', screen: 'new' })}>
            {t.bookings.bookAgain}
          </button>
        )}
      </div>
    </>
  )
}

function Directory({ lang, dir, t, onBack, push }) {
  return (
    <>
      <Header lang={lang} dir={dir} title={t.bookings.directory} onBack={onBack} />
      <div className="bk-list">
        {INTERPRETERS.map((itp, i) => (
          <motion.div key={itp.id} className="itp-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <span className="itp-card__avatar">{itp.initial}</span>
            <div className="itp-card__body">
              <span className="itp-card__name">{itp.name[lang]}</span>
              <span className="itp-card__meta">
                <Icon name="sparkle" size={12} /> {itp.rating.toFixed(1)} · {itp.specialties[lang].join(' · ')}
              </span>
              <span className="itp-card__langs">{itp.languages.join(' · ')}</span>
            </div>
            <button className="chipbtn" onClick={() => push('new', { interpreterId: itp.id })}>{t.bookings.requestThis}</button>
          </motion.div>
        ))}
      </div>
    </>
  )
}

/* ------------------------------- new booking wizard ------------------------------- */

function NewBooking({ lang, dir, t, onBack, add, params }) {
  const w = t.bookings.wizard
  const [step, setStep] = useState(0)
  const [typeId, setTypeId] = useState('hospital')
  const [mode, setMode] = useState('onsite')
  const [dayOffset, setDayOffset] = useState(2)
  const [hour, setHour] = useState(10)
  const [langPair, setLangPair] = useState('SSL ↔ Arabic')
  const [interpreterId, setInterpreterId] = useState(params?.interpreterId || '')
  const [notes, setNotes] = useState('')
  const [done, setDone] = useState(false)

  const steps = [w.step1, w.step2, w.step3, w.step4, w.step5]
  const dt = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + dayOffset)
    d.setHours(hour, 0, 0, 0)
    return d.toISOString()
  }, [dayOffset, hour])

  const submit = () => {
    add({
      typeId, mode, dt, status: 'pending', langPair,
      interpreterId: interpreterId || null,
      location: mode === 'video'
        ? { ar: 'اتصال مرئي', en: 'Video call' }
        : { ar: 'يُحدَّد لاحقًا', en: 'To be set' },
      notes: { ar: notes, en: notes },
    })
    setDone(true)
  }

  if (done) {
    return (
      <>
        <Header lang={lang} dir={dir} title={w.successTitle} onBack={onBack} />
        <div className="wizard-success">
          <span className="wizard-success__ring"><Icon name="check" size={38} /></span>
          <p className="wizard-success__title">{w.successTitle}</p>
          <p className="wizard-success__body">{w.successBody}</p>
          <button className="btn btn--primary" onClick={onBack}>{t.common.done}</button>
        </div>
      </>
    )
  }

  return (
    <>
      <Header lang={lang} dir={dir} title={t.bookings.newBooking} onBack={step === 0 ? onBack : () => setStep((s) => s - 1)} />

      <div className="wizard-steps">
        {steps.map((s, i) => (
          <span key={s} className={`wizard-steps__dot ${i === step ? 'is-on' : ''} ${i < step ? 'is-done' : ''}`} />
        ))}
      </div>
      <p className="wizard-steptitle">{steps[step]}</p>

      {step === 0 && (
        <div className="opt-list">
          {BOOKING_TYPES.map((ty) => (
            <button key={ty.id} className={`opt-row ${typeId === ty.id ? 'is-on' : ''}`} onClick={() => setTypeId(ty.id)}>
              <Icon name={ty.icon} size={18} /> {ty.name[lang]}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="opt-list">
          <button className={`opt-row opt-row--tall ${mode === 'onsite' ? 'is-on' : ''}`} onClick={() => setMode('onsite')}>
            <Icon name="users" size={18} />
            <span><b>{w.onsite}</b><i>{w.onsiteSub}</i></span>
          </button>
          <button className={`opt-row opt-row--tall ${mode === 'video' ? 'is-on' : ''}`} onClick={() => setMode('video')}>
            <Icon name="phone" size={18} />
            <span><b>{w.video}</b><i>{w.videoSub}</i></span>
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="picker">
          <div className="picker__group">
            {[1, 2, 3, 4, 5, 7].map((d) => {
              const date = new Date(); date.setDate(date.getDate() + d)
              return (
                <button key={d} className={`picker__chip ${dayOffset === d ? 'is-on' : ''}`} onClick={() => setDayOffset(d)}>
                  {date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB', { weekday: 'short', day: 'numeric' })}
                </button>
              )
            })}
          </div>
          <div className="picker__group">
            {[8, 9, 10, 11, 13, 14, 15, 16].map((h) => (
              <button key={h} className={`picker__chip ${hour === h ? 'is-on' : ''}`} onClick={() => setHour(h)}>
                {String(h).padStart(2, '0')}:00
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="opt-list">
          {['SSL ↔ Arabic', 'SSL ↔ ASL', 'SSL ↔ International Sign'].map((p) => (
            <button key={p} className={`opt-row ${langPair === p ? 'is-on' : ''}`} onClick={() => setLangPair(p)}>
              <Icon name="globe" size={18} /> {p}
            </button>
          ))}
          <p className="tmode__label">{w.pickInterpreter}</p>
          <button className={`opt-row ${!interpreterId ? 'is-on' : ''}`} onClick={() => setInterpreterId('')}>
            <Icon name="users" size={18} /> {w.anyInterpreter}
          </button>
          {INTERPRETERS.map((itp) => (
            <button key={itp.id} className={`opt-row ${interpreterId === itp.id ? 'is-on' : ''}`} onClick={() => setInterpreterId(itp.id)}>
              <span className="itp-card__avatar itp-card__avatar--sm">{itp.initial}</span>
              {itp.name[lang]} · {itp.specialties[lang][0]}
            </button>
          ))}
        </div>
      )}

      {step === 4 && (
        <div>
          <textarea className="tmode__input" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={w.notesPlaceholder} />
          <div className="kv">
            <div className="kv__row"><span>{steps[0]}</span><span>{typeById(typeId).name[lang]}</span></div>
            <div className="kv__row"><span>{steps[1]}</span><span>{mode === 'video' ? w.video : w.onsite}</span></div>
            <div className="kv__row"><span>{steps[2]}</span><span>{fmt(dt, lang)}</span></div>
            <div className="kv__row"><span>{steps[3]}</span><span>{langPair}</span></div>
          </div>
        </div>
      )}

      <div className="detail-actions">
        {step < 4 ? (
          <button className="btn btn--primary" onClick={() => setStep((s) => s + 1)}>{t.common.next}</button>
        ) : (
          <button className="btn btn--primary" onClick={submit}>{w.confirmTitle}</button>
        )}
      </div>
    </>
  )
}

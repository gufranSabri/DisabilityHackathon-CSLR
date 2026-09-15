import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { Section, SectionHead } from '../components/Section'
import { copyText } from '../clipboard'
import { TOOLKIT } from '../content'

export default function Toolkit() {
  const { lang, dir, t } = useL()
  const k = t.toolkit
  const arrow = dir === 'rtl' ? 'arrowLeft' : 'arrowRight'

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="page-hero__eyebrow">{t.nav.toolkit}</p>
          <h1 className="page-hero__title">{k.title}</h1>
          <p className="page-hero__sub">{k.sub}</p>
        </div>
      </section>

      <Section>
        <div className="toolkit-grid">
          <RequestForm lang={lang} k={k} />
          <div className="toolkit-side">
            <WidgetSnippet lang={lang} k={k} arrow={arrow} />
            <BulkRequest lang={lang} k={k} />
          </div>
        </div>
      </Section>
    </>
  )
}

function RequestForm({ lang, k }) {
  const [org, setOrg] = useState('')
  const [sector, setSector] = useState('school')
  const [needs, setNeeds] = useState([])
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [done, setDone] = useState(false)

  const toggleNeed = (id) => setNeeds((n) => (n.includes(id) ? n.filter((x) => x !== id) : [...n, id]))

  const payload = () => ({
    type: 'accessibility-support-request',
    submittedAt: new Date().toISOString(),
    organization: org,
    sector,
    needs,
    contactEmail: email,
    notes,
  })

  const download = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload(), null, 2)], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'signworld-request.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (done) {
    return (
      <motion.div className="toolkit-card toolkit-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <span className="toolkit-success__ring"><Icon name="check" size={34} /></span>
        <h3>{k.successTitle}</h3>
        <p>{k.successBody}</p>
        <div className="toolkit-success__actions">
          <button className="btn btn--primary btn--sm" onClick={download}><Icon name="download" size={14} /> {k.downloadJson}</button>
          <button className="btn btn--ghost btn--sm" onClick={() => { setDone(false); setOrg(''); setNeeds([]); setEmail(''); setNotes('') }}>{k.reset}</button>
        </div>
      </motion.div>
    )
  }

  return (
    <form className="toolkit-card" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
      <h3 className="toolkit-card__title">{k.formTitle}</h3>

      <label className="fld">
        <span>{k.orgLabel}</span>
        <input required value={org} onChange={(e) => setOrg(e.target.value)} />
      </label>

      <label className="fld">
        <span>{k.sectorLabel}</span>
        <select value={sector} onChange={(e) => setSector(e.target.value)}>
          {TOOLKIT.sectors.map((s) => <option key={s.id} value={s.id}>{s[lang]}</option>)}
        </select>
      </label>

      <fieldset className="fld">
        <span>{k.needsLabel}</span>
        <div className="checks">
          {TOOLKIT.needs[lang].map((n) => (
            <label key={n.id} className={`check ${needs.includes(n.id) ? 'is-on' : ''}`}>
              <input type="checkbox" checked={needs.includes(n.id)} onChange={() => toggleNeed(n.id)} />
              {n.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="fld">
        <span>{k.contactLabel}</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label className="fld">
        <span>{k.notesLabel}</span>
        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      <button type="submit" className="btn btn--primary">{k.submit}</button>
    </form>
  )
}

function WidgetSnippet({ lang, k, arrow }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    copyText(TOOLKIT.widgetSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <div className="toolkit-card">
      <h3 className="toolkit-card__title">{k.widgetTitle}</h3>
      <p className="toolkit-card__sub">{k.widgetBody}</p>
      <pre className="code-block"><code>{TOOLKIT.widgetSnippet}</code>
        <button className="code-block__copy" onClick={copy}>
          <Icon name={copied ? 'check' : 'copy'} size={13} /> {copied ? k.copied : k.copy}
        </button>
      </pre>
      <Link to="/widget" className="btn btn--ghost btn--sm">{k.tryWidget} <Icon name={arrow} size={13} /></Link>
    </div>
  )
}

function BulkRequest({ lang, k }) {
  const [count, setCount] = useState(5)
  const [langs, setLangs] = useState('SSL ↔ Arabic')
  const [dates, setDates] = useState('')
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="toolkit-card toolkit-card--slim">
        <span className="toolkit-success__ring toolkit-success__ring--sm"><Icon name="check" size={22} /></span>
        <p className="toolkit-card__sub" style={{ margin: 0 }}>{k.successBody}</p>
      </div>
    )
  }

  return (
    <form className="toolkit-card toolkit-card--slim" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
      <h3 className="toolkit-card__title">{k.bulkTitle}</h3>
      <label className="fld">
        <span>{k.bulkCount}</span>
        <input type="number" min="1" max="200" value={count} onChange={(e) => setCount(+e.target.value)} />
      </label>
      <label className="fld">
        <span>{k.bulkLangs}</span>
        <select value={langs} onChange={(e) => setLangs(e.target.value)}>
          <option>SSL ↔ Arabic</option>
          <option>SSL ↔ ASL</option>
          <option>SSL ↔ International Sign</option>
        </select>
      </label>
      <label className="fld">
        <span>{k.bulkDates}</span>
        <input value={dates} onChange={(e) => setDates(e.target.value)} placeholder="—" />
      </label>
      <button type="submit" className="btn btn--primary btn--sm">{k.bulkSubmit}</button>
    </form>
  )
}

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '../Icons'
import Header from '../components/Header'
import Segmented from '../components/Segmented'
import ServiceCard from '../components/ServiceCard'
import AvatarStage from '../components/AvatarStage'
import { SERVICES, SITUATIONS, CATEGORIES } from '../content'

export default function Services(props) {
  const { lang, dir, t, toggleLang, navigate, top, push, pop, isSaved, toggle: toggleSave, saved } = props

  if (top?.name === 'situation') {
    const sit = SITUATIONS.find((s) => s.id === top.params.id)
    return <SituationView {...props} sit={sit} onBack={pop} />
  }
  if (top?.name === 'detail') {
    const svc = SERVICES[top.params.id]
    return <ServiceDetail {...props} svc={svc} onBack={pop} />
  }

  return <ServicesRoot {...props} />
}

function openService(svc, { navigate, push }) {
  if (svc.kind === 'app') navigate(svc.target)
  else if (svc.target) navigate(svc.target)
  else push('detail', { id: svc.id })
}

function ServicesRoot({ lang, dir, t, toggleLang, navigate, push, isSaved, toggle: toggleSave }) {
  const [view, setView] = useState('moment') // moment | all
  const [query, setQuery] = useState('')
  const [savedOnly, setSavedOnly] = useState(false)

  const all = Object.values(SERVICES)
  const filtered = useMemo(() => {
    let list = all
    if (savedOnly) list = list.filter((s) => isSaved(s.id))
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter((s) =>
        s.name[lang].toLowerCase().includes(q) ||
        s.tagline[lang].toLowerCase().includes(q) ||
        s.body[lang].toLowerCase().includes(q),
      )
    }
    return list
  }, [all, savedOnly, query, lang, isSaved])

  const byCat = CATEGORIES.map((c) => ({ cat: c, items: filtered.filter((s) => s.category === c.id) })).filter((g) => g.items.length)

  return (
    <>
      <Header lang={lang} dir={dir} title={t.services.title} onToggleLang={toggleLang} />

      <Segmented
        options={[
          { id: 'moment', label: t.services.byMoment },
          { id: 'all', label: t.services.allServices },
        ]}
        value={view}
        onChange={setView}
      />

      {view === 'moment' ? (
        <div className="sit-list">
          {SITUATIONS.map((s, i) => (
            <motion.button
              key={s.id}
              className="sit-row"
              onClick={() => push('situation', { id: s.id })}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            >
              <span className="sit-row__icon"><Icon name={s.icon} size={20} /></span>
              <div className="sit-row__body">
                <span className="sit-row__title">{s.title[lang]}</span>
                <span className="sit-row__sub">{s.body[lang]}</span>
              </div>
              <span className="sit-row__count">{s.tools.length}</span>
              <Icon name={dir === 'rtl' ? 'chevronLeft' : 'chevronRight'} size={16} />
            </motion.button>
          ))}
        </div>
      ) : (
        <>
          <div className="svc-search">
            <Icon name="search" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.services.searchPlaceholder}
            />
          </div>
          <div className="segmented segmented--sub">
            <button className={`segmented__btn ${!savedOnly ? 'is-on' : ''}`} onClick={() => setSavedOnly(false)}>{t.services.allFilter}</button>
            <button className={`segmented__btn ${savedOnly ? 'is-on' : ''}`} onClick={() => setSavedOnly(true)}>{t.services.savedFilter}</button>
          </div>

          {byCat.length === 0 && <p className="empty-note">{t.services.noResults}</p>}
          {byCat.map((g) => (
            <div key={g.cat.id} className="svc-catgroup">
              <p className="svc-catgroup__title">{g.cat.name[lang]}</p>
              <div className="svc-grid">
                {g.items.map((s, i) => (
                  <ServiceCard
                    key={s.id} service={s} lang={lang} dir={dir} t={t} index={i}
                    isSaved={isSaved(s.id)} onToggleSave={toggleSave}
                    onOpen={(svc) => openService(svc, { navigate, push })}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}

function SituationView({ lang, dir, t, sit, onBack, navigate, push, isSaved, toggle: toggleSave }) {
  if (!sit) { onBack(); return null }
  return (
    <>
      <Header lang={lang} dir={dir} title={sit.title[lang]} onBack={onBack} />
      <p className="sit-head__body">{sit.body[lang]}</p>
      <div className="svc-grid">
        {sit.tools.map((id, i) => {
          const s = SERVICES[id]
          if (!s) return null
          return (
            <ServiceCard
              key={id} service={s} lang={lang} dir={dir} t={t} index={i}
              isSaved={isSaved(s.id)} onToggleSave={toggleSave}
              onOpen={(svc) => openService(svc, { navigate, push })}
            />
          )
        })}
      </div>
    </>
  )
}

function ServiceDetail({ lang, dir, t, svc, onBack, navigate, push }) {
  if (!svc) { onBack(); return null }
  const steps = svc.steps?.[lang] || []
  const related = (svc.related || []).map((id) => SERVICES[id]).filter(Boolean)

  return (
    <>
      <Header lang={lang} dir={dir} title={svc.name[lang]} onBack={onBack} />

      <div className="detail-hero" style={{ '--card-accent': svc.accent }}>
        <span className="detail-hero__icon"><Icon name={svc.icon} size={26} /></span>
        <p className="detail-hero__tagline">{svc.tagline[lang]}</p>
        <p className="detail-hero__body">{svc.body[lang]}</p>
      </div>

      <p className="home-sectitle">{t.services.howHelps}</p>
      <AvatarStage
        signing
        caption={svc.body[lang]}
        badgeIdle={lang === 'ar' ? 'جاهز' : 'Idle'}
        badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'}
      />

      {steps.length > 0 && (
        <>
          <p className="home-sectitle">{t.services.steps}</p>
          <ol className="detail-steps">
            {steps.map((s, i) => (
              <li key={i}><span className="detail-steps__num">{i + 1}</span>{s}</li>
            ))}
          </ol>
        </>
      )}

      {related.length > 0 && (
        <>
          <p className="home-sectitle">{t.services.relatedTools}</p>
          <div className="detail-related">
            {related.map((r) => (
              <button key={r.id} className="detail-related__chip" onClick={() => (r.kind === 'app' ? navigate(r.target) : push('detail', { id: r.id }))}>
                <Icon name={r.icon} size={14} /> {r.name[lang]}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="detail-actions">
        <button className="btn btn--primary" onClick={() => navigate({ tab: 'bookings', screen: 'new' })}>
          {t.services.bookForThis}
        </button>
        {svc.openLabel && (
          <button className="btn btn--ghost" onClick={() => {}}>
            {svc.openLabel[lang]}
            <Icon name={dir === 'rtl' ? 'arrowLeft' : 'arrowRight'} size={14} />
          </button>
        )}
      </div>
    </>
  )
}

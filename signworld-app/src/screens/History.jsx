import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import Header from '../components/Header'
import AvatarStage from '../components/AvatarStage'

const KIND_ICON = { sign2text: 'camera', text2sign: 'avatar', sos: 'sos', doc: 'doc' }

export default function History({ lang, dir, t, onBack, history, clearHistory }) {
  const h = t.history
  const [filter, setFilter] = useState('all')
  const [replay, setReplay] = useState(null)

  const filters = ['all', 'sign2text', 'text2sign', 'sos', 'doc']
  const visible = useMemo(
    () => (filter === 'all' ? history : history.filter((e) => e.kind === filter)),
    [history, filter],
  )

  const fmt = (at) =>
    new Date(at).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB', { day: 'numeric', month: 'short' }) +
    ' · ' +
    new Date(at).toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      <Header lang={lang} dir={dir} title={h.title} onBack={onBack} />

      <div className="hist-filters">
        {filters.map((f) => (
          <button key={f} className={`phrase-chip ${filter === f ? 'is-on' : ''}`} onClick={() => setFilter(f)}>
            {h.filters[f]}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="empty-note">{h.empty}</p>
      ) : (
        <div className="bk-list">
          {visible.map((e, i) => (
            <motion.div
              key={e.id} className="hist-row"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            >
              <span className="hist-row__icon"><Icon name={KIND_ICON[e.kind] || 'clock'} size={16} /></span>
              <div className="hist-row__body">
                <span className="hist-row__kind">{h.kinds[e.kind] || e.kind}</span>
                <span className="hist-row__title">{e.title || e.detail}</span>
                <span className="hist-row__time">{fmt(e.at)}</span>
              </div>
              {(e.kind === 'sign2text' || e.kind === 'text2sign') && e.detail && (
                <button className="chipbtn" onClick={() => setReplay(e)}>
                  <Icon name="play" size={13} /> {h.replay}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <button className="btn btn--ghost" style={{ marginTop: 16 }} onClick={clearHistory}>
          <Icon name="close" size={15} /> {h.clear}
        </button>
      )}

      <AnimatePresence>
        {replay && (
          <motion.div className="sheet-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setReplay(null)}>
            <motion.div
              className="sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sheet__handle" />
              <p className="sheet__title">{h.kinds[replay.kind]}</p>
              <AvatarStage signing caption={replay.detail} badgeIdle={lang === 'ar' ? 'جاهز' : 'Idle'} badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'} />
              <button className="btn btn--ghost" style={{ marginTop: 16 }} onClick={() => setReplay(null)}>{t.common.close}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import Header from '../components/Header'
import AvatarStage from '../components/AvatarStage'
import { COMMUNITY_LINKS, FORUM_SEED } from '../content'

export default function Community({ lang, dir, t, onBack, push, pop, top }) {
  if (top?.name === 'forumThread') {
    const thread = FORUM_SEED.find((f) => f.id === top.params.threadId)
    return <Thread lang={lang} dir={dir} t={t} thread={thread} onBack={pop} />
  }
  return <CommunityRoot lang={lang} dir={dir} t={t} onBack={onBack} push={push} />
}

function CommunityRoot({ lang, dir, t, onBack, push }) {
  const cm = t.community
  const [explain, setExplain] = useState(null)

  return (
    <>
      <Header lang={lang} dir={dir} title={cm.title} onBack={onBack} />

      <p className="home-sectitle">{cm.linksTitle}</p>
      <div className="bk-list">
        {COMMUNITY_LINKS.map((l, i) => (
          <motion.div
            key={l.id} className="comm-card"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          >
            <div className="comm-card__head">
              <span className="comm-card__icon"><Icon name={l.icon} size={18} /></span>
              <span className="comm-card__name">{l.name[lang]}</span>
            </div>
            <p className="comm-card__blurb">{l.blurb[lang]}</p>
            <div className="comm-card__actions">
              <button className="chipbtn" onClick={() => setExplain(l)}>
                <Icon name="play" size={13} /> {cm.explainInSign}
              </button>
              <button className="chipbtn" onClick={() => {}}>
                <Icon name="globe" size={13} /> {cm.openExternal}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="home-sectitle">{cm.forumTitle}</p>
      <div className="bk-list">
        {FORUM_SEED.map((f, i) => (
          <motion.button
            key={f.id} className="bk-card" onClick={() => push('forumThread', { threadId: f.id })}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          >
            <span className="bk-card__icon"><Icon name="chat" size={18} /></span>
            <div className="bk-card__body">
              <span className="bk-card__title">{f.title[lang]}</span>
              <span className="bk-card__meta">{f.author[lang]} · {f.replies} {cm.forumReplies}</span>
            </div>
            <Icon name={dir === 'rtl' ? 'chevronLeft' : 'chevronRight'} size={16} />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {explain && (
          <motion.div className="sheet-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setExplain(null)}>
            <motion.div
              className="sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sheet__handle" />
              <p className="sheet__title">{explain.name[lang]}</p>
              <AvatarStage signing caption={explain.blurb[lang]} badgeIdle={lang === 'ar' ? 'جاهز' : 'Idle'} badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'} />
              <button className="btn btn--ghost" style={{ marginTop: 16 }} onClick={() => setExplain(null)}>{t.common.close}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Thread({ lang, dir, t, thread, onBack }) {
  const cm = t.community
  const [posts, setPosts] = useState(thread?.posts || [])
  const [draft, setDraft] = useState('')
  if (!thread) { onBack(); return null }

  const post = () => {
    if (!draft.trim()) return
    setPosts((p) => [...p, { author: { ar: 'أنت', en: 'You' }, text: { ar: draft.trim(), en: draft.trim() }, mine: true }])
    setDraft('')
  }

  return (
    <>
      <Header lang={lang} dir={dir} title={cm.threadTitle} onBack={onBack} />
      <h2 className="thread__title">{thread.title[lang]}</h2>
      <div className="thread__posts">
        {posts.map((p, i) => (
          <div key={i} className={`thread__post ${p.mine ? 'thread__post--mine' : ''}`}>
            <span className="thread__author">{p.author[lang]}</span>
            <p className="thread__text">{p.text[lang]}</p>
          </div>
        ))}
      </div>
      <div className="chat__input">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={cm.replyPlaceholder}
          onKeyDown={(e) => { if (e.key === 'Enter') post() }} />
        <button className="chat__send" onClick={post} aria-label={cm.postReply}>
          <Icon name={dir === 'rtl' ? 'arrowLeft' : 'arrowRight'} size={18} />
        </button>
      </div>
    </>
  )
}

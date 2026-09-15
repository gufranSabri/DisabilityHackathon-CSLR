import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import Header from '../components/Header'
import AvatarStage from '../components/AvatarStage'
import { CHAT_SEED } from '../content'

export default function DeafChat({ lang, dir, t, onBack, push, pop, top }) {
  const c = t.deafChat
  const threadId = top?.name === 'chatThread' ? top?.params?.threadId : null
  if (threadId) {
    const thread = CHAT_SEED.find((th) => th.id === threadId)
    return <Conversation lang={lang} dir={dir} t={t} thread={thread} onBack={pop} />
  }

  return (
    <>
      <Header lang={lang} dir={dir} title={c.title} onBack={onBack} />
      <div className="bk-list">
        {CHAT_SEED.map((th, i) => {
          const lastMsg = th.messages[th.messages.length - 1]
          return (
            <motion.button
              key={th.id} className="chat-row" onClick={() => push('chatThread', { threadId: th.id })}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            >
              <span className={`chat-row__avatar ${th.group ? 'chat-row__avatar--group' : ''}`}>{th.initial}</span>
              <div className="chat-row__body">
                <span className="chat-row__name">
                  {th.name[lang]}
                  {th.group && <span className="chat-row__tag">{c.groupTag}</span>}
                </span>
                <span className="chat-row__preview">
                  {lastMsg.kind === 'video' ? `📹 ${c.videoMessage}` : lastMsg.text[lang]}
                </span>
              </div>
              <Icon name={dir === 'rtl' ? 'chevronLeft' : 'chevronRight'} size={16} />
            </motion.button>
          )
        })}
      </div>
    </>
  )
}

function Conversation({ lang, dir, t, thread, onBack }) {
  const c = t.deafChat
  const [msgs, setMsgs] = useState(thread?.messages || [])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const [videoClip, setVideoClip] = useState(null)
  const scrollRef = useRef(null)
  const replyIdx = useRef(0)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing])

  if (!thread) { onBack(); return null }

  const sendMine = (kind, text) => {
    setMsgs((m) => [...m, { from: 'me', kind, text: { ar: text, en: text } }])
    setDraft('')
    // canned reply after a beat
    setTyping(true)
    setTimeout(() => {
      const pool = thread.replies[lang]
      const reply = pool[replyIdx.current % pool.length]
      replyIdx.current += 1
      setTyping(false)
      setMsgs((m) => [...m, { from: 'them', kind: 'text', text: { ar: reply, en: reply } }])
    }, 1600)
  }

  return (
    <div className="chat">
      <Header lang={lang} dir={dir} title={thread.name[lang]} onBack={onBack} />

      <div className="chat__scroll" ref={scrollRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`bubble ${m.from === 'me' ? 'bubble--me' : ''}`}>
            {m.kind === 'video' ? (
              <button className="bubble__video" onClick={() => setVideoClip(m.text[lang])}>
                <span className="bubble__videoicon"><Icon name="play" size={16} /></span>
                <span>{c.videoMessage}</span>
              </button>
            ) : (
              m.text[lang]
            )}
          </div>
        ))}
        {typing && (
          <div className="bubble bubble--typing"><span /><span /><span /></div>
        )}
      </div>

      <div className="chat__input">
        <button className="iconbtn" onClick={() => sendMine('video', c.sendSigned)} aria-label={c.sendSigned}>
          <Icon name="avatar" size={17} />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && draft.trim()) sendMine('text', draft.trim()) }}
          placeholder={c.inputPlaceholder}
        />
        <button className="chat__send" onClick={() => draft.trim() && sendMine('text', draft.trim())} aria-label={c.send}>
          <Icon name={dir === 'rtl' ? 'arrowLeft' : 'arrowRight'} size={18} />
        </button>
      </div>

      <AnimatePresence>
        {videoClip && (
          <motion.div className="sheet-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideoClip(null)}>
            <motion.div
              className="sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sheet__handle" />
              <p className="sheet__title">{c.videoMessage}</p>
              <AvatarStage signing caption={videoClip} badgeIdle={lang === 'ar' ? 'جاهز' : 'Idle'} badgeLive={lang === 'ar' ? 'يُترجم' : 'Signing'} />
              <button className="btn btn--ghost" style={{ marginTop: 16 }} onClick={() => setVideoClip(null)}>{t.common.close}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

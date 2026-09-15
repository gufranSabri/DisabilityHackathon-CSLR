import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SaduField } from './Ornaments'
import useLang from './useLang'
import { useProfile, useSaved, useBookings, useHistory, useSettings } from './useStore'
import { CONTENT } from './content'

import TabBar from './components/TabBar'
import SosPill from './components/SosPill'
import SosFlow from './components/SosFlow'
import Onboarding from './screens/Onboarding'

import Home from './screens/Home'
import Services from './screens/Services'
import Translate from './screens/Translate'
import Bookings from './screens/Bookings'
import Me from './screens/Me'

const TABS = ['home', 'services', 'translate', 'bookings', 'me']

const pageMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
}

export default function App() {
  const { lang, dir, t, toggle } = useLang(CONTENT)
  const profileStore = useProfile()
  const savedStore = useSaved()
  const bookingsStore = useBookings()
  const historyStore = useHistory()
  const settingsStore = useSettings()

  const [tab, setTab] = useState('home')
  // one navigation stack per tab: array of screen descriptors { name, params }
  const [stacks, setStacks] = useState(() =>
    Object.fromEntries(TABS.map((k) => [k, []])),
  )
  const [sosOpen, setSosOpen] = useState(false)
  // params passed into a fresh tab root (e.g. Translate mode, Services filter)
  const [tabParams, setTabParams] = useState({})

  const push = useCallback((tabKey, name, params = {}) => {
    setStacks((s) => ({ ...s, [tabKey]: [...s[tabKey], { name, params }] }))
  }, [])

  const pop = useCallback((tabKey) => {
    setStacks((s) => ({ ...s, [tabKey]: s[tabKey].slice(0, -1) }))
  }, [])

  const resetStack = useCallback((tabKey) => {
    setStacks((s) => ({ ...s, [tabKey]: [] }))
  }, [])

  // central navigation entry point used by cards/buttons everywhere
  const navigate = useCallback((target) => {
    if (!target) return
    if (target.sos) { setSosOpen(true); return }
    const { tab: tk, screen, mode, ...rest } = target
    if (!tk) return
    setTab(tk)
    setTabParams((p) => ({ ...p, [tk]: { mode, ...rest } }))
    if (screen) {
      setStacks((s) => ({ ...s, [tk]: [{ name: screen, params: rest }] }))
    } else {
      setStacks((s) => ({ ...s, [tk]: [] }))
    }
  }, [])

  const onTabNav = useCallback((tk) => {
    if (tk === tab) {
      // tapping the active tab pops to its root
      resetStack(tk)
    } else {
      setTab(tk)
    }
  }, [tab, resetStack])

  const activeStack = stacks[tab]
  const top = activeStack[activeStack.length - 1] || null

  const screenProps = useMemo(() => ({
    lang, dir, t, toggleLang: toggle,
    navigate,
    push: (name, params) => push(tab, name, params),
    pop: () => pop(tab),
    stackDepth: activeStack.length,
    params: tabParams[tab] || {},
    ...profileStore, ...savedStore, ...bookingsStore,
    settings: settingsStore.settings, updateSettings: settingsStore.update,
    history: historyStore.history, addHistory: historyStore.add, clearHistory: historyStore.clear,
    openSos: () => setSosOpen(true),
  }), [lang, dir, t, toggle, navigate, push, pop, tab, activeStack.length, tabParams,
      profileStore, savedStore, bookingsStore, historyStore, settingsStore])

  const renderTab = () => {
    switch (tab) {
      case 'home': return <Home {...screenProps} top={top} />
      case 'services': return <Services {...screenProps} top={top} />
      case 'translate': return <Translate {...screenProps} top={top} />
      case 'bookings': return <Bookings {...screenProps} top={top} />
      case 'me': return <Me {...screenProps} top={top} />
      default: return null
    }
  }

  const cameraFullscreen = tab === 'translate'
  const hideSosPill = cameraFullscreen || ['chatThread', 'forumThread', 'deafChat'].includes(top?.name)
  const key = `${tab}:${top?.name || 'root'}`

  if (!settingsStore.settings.onboarded) {
    return (
      <div className="app" dir={dir}>
        <SaduField />
        <Onboarding
          lang={lang} dir={dir} t={t} toggleLang={toggle}
          profile={profileStore.profile}
          updateProfile={profileStore.update}
          onDone={() => settingsStore.update({ onboarded: true })}
        />
      </div>
    )
  }

  return (
    <div className="app" dir={dir}>
      <SaduField />

      <AnimatePresence mode="wait">
        <motion.main key={key} className="screen" {...pageMotion}>
          {renderTab()}
        </motion.main>
      </AnimatePresence>

      {!sosOpen && !hideSosPill && (
        <SosPill label={t.sos.pill} onClick={() => setSosOpen(true)} />
      )}

      <TabBar t={t.tabs} active={tab} onNav={onTabNav} />

      <AnimatePresence>
        {sosOpen && (
          <SosFlow
            t={t}
            lang={lang}
            profile={profileStore.profile}
            onClose={() => setSosOpen(false)}
            onLogged={historyStore.add}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

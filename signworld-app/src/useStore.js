import { useCallback, useEffect, useState } from 'react'
import { PROFILE_DEFAULT, BOOKINGS_SEED } from './content'

// Minimal localStorage-backed store. One hook per slice; each persists on
// change and falls back to a seed when storage is empty or unreadable.

function usePersisted(key, seed) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : seed
    } catch {
      return seed
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch { /* ignore */ }
  }, [key, value])
  return [value, setValue]
}

export function useProfile() {
  const [profile, setProfile] = usePersisted('signworld.profile', PROFILE_DEFAULT)
  const update = useCallback((patch) => setProfile((p) => ({ ...p, ...patch })), [setProfile])
  const updateMedical = useCallback(
    (patch) => setProfile((p) => ({ ...p, medical: { ...p.medical, ...patch } })),
    [setProfile],
  )
  const updateSos = useCallback(
    (patch) => setProfile((p) => ({ ...p, sos: { ...p.sos, ...patch } })),
    [setProfile],
  )
  return { profile, update, updateMedical, updateSos }
}

export function useSaved() {
  const [saved, setSaved] = usePersisted('signworld.saved', [])
  const isSaved = useCallback((id) => saved.includes(id), [saved])
  const toggle = useCallback(
    (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
    [setSaved],
  )
  return { saved, isSaved, toggle }
}

export function useBookings() {
  const [bookings, setBookings] = usePersisted('signworld.bookings', BOOKINGS_SEED)
  const add = useCallback(
    (b) => setBookings((list) => [{ ...b, id: `bk-${Date.now()}` }, ...list]),
    [setBookings],
  )
  const cancel = useCallback(
    (id) => setBookings((list) => list.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))),
    [setBookings],
  )
  return { bookings, add, cancel }
}

export function useHistory() {
  const [history, setHistory] = usePersisted('signworld.history', [])
  const add = useCallback(
    (entry) => setHistory((h) => [{ ...entry, id: `h-${Date.now()}`, at: Date.now() }, ...h].slice(0, 60)),
    [setHistory],
  )
  const clear = useCallback(() => setHistory([]), [setHistory])
  return { history, add, clear }
}

const SETTINGS_DEFAULT = { textSize: 'md', highContrast: false, reduceMotion: false, onboarded: false }

export function useSettings() {
  const [settings, setSettings] = usePersisted('signworld.settings', SETTINGS_DEFAULT)
  const update = useCallback((patch) => setSettings((s) => ({ ...s, ...patch })), [setSettings])

  useEffect(() => {
    const r = document.documentElement
    r.dataset.textSize = settings.textSize
    r.dataset.contrast = settings.highContrast ? 'high' : 'normal'
    r.dataset.motion = settings.reduceMotion ? 'reduce' : 'full'
  }, [settings])

  return { settings, update }
}

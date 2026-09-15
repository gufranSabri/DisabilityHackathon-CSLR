import { useCallback, useEffect, useState } from 'react'

// Tiny framework-free bilingual helper. `content` is shaped as
// `{ en: {...}, ar: {...} }`; `t` is whichever half is active.
// Toggling flips both the returned copy object and text direction.
// Choice persists to localStorage; default is Arabic (Deaf Saudi users).
const KEY = 'signworld.lang'

export default function useLang(content, initial = 'ar') {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(KEY) || initial
    } catch {
      return initial
    }
  })

  const toggle = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang)
    } catch { /* ignore */ }
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return {
    lang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    t: content[lang],
    toggle,
  }
}

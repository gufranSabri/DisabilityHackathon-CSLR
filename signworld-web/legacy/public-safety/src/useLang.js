import { useCallback, useState } from 'react'

// Tiny framework-free bilingual helper. `content` is shaped as
// `{ en: {...}, ar: {...} }`; `t` is whichever half is active.
// Toggling flips both the returned copy object and text direction.
export default function useLang(content, initial = 'en') {
  const [lang, setLang] = useState(initial)
  const toggle = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), [])
  return {
    lang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    t: content[lang],
    toggle,
  }
}

import { useL } from '../useLangCtx'

export default function LangToggle({ className = '' }) {
  const { lang, toggle } = useL()
  return (
    <button className={`langbtn ${className}`} onClick={toggle} aria-label="Toggle language">
      {lang === 'ar' ? 'EN' : 'ع'}
    </button>
  )
}

import Icon from '../Icons'

// Per-screen header. When `onBack` is set, shows a back arrow (direction-aware);
// otherwise shows the greeting/title block. Right side: optional bell + lang toggle.
export default function Header({
  lang, dir, title, subtitle, onBack, onToggleLang, onBell, notif = 0, right = null,
}) {
  const backIcon = dir === 'rtl' ? 'arrowRight' : 'arrowLeft'
  return (
    <header className="apphdr">
      {onBack ? (
        <button className="iconbtn" onClick={onBack} aria-label="Back">
          <Icon name={backIcon} size={18} />
        </button>
      ) : (
        <span className="apphdr__brand">
          <span className="apphdr__glyph">
            <svg viewBox="0 0 28 28" width="16" height="16" aria-hidden="true">
              <path d="M14 2 22 14 14 26 6 14Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M14 9 18 14 14 19 10 14Z" fill="currentColor" />
            </svg>
          </span>
        </span>
      )}

      <div className="apphdr__titles">
        <span className="apphdr__title">{title}</span>
        {subtitle && <span className="apphdr__sub">{subtitle}</span>}
      </div>

      <div className="apphdr__actions">
        {right}
        {onBell && (
          <button className="iconbtn" onClick={onBell} aria-label="Notifications">
            <Icon name="bell" size={17} />
            {notif > 0 && <span className="iconbtn__dot" />}
          </button>
        )}
        {onToggleLang && (
          <button className="langbtn" onClick={onToggleLang}>{lang === 'ar' ? 'EN' : 'ع'}</button>
        )}
      </div>
    </header>
  )
}

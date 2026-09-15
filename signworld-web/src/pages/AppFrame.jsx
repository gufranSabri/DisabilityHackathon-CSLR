import { useParams, Link, Navigate } from 'react-router-dom'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { APPS } from '../content'

// Full-screen host for an embedded flagship app. Each app is its own built
// bundle (legacy/<dir> -> public/legacy/<id>/, see scripts/build-legacy.mjs)
// with its own React tree, CSS tokens, and fonts — loaded in an <iframe> so
// none of that collides with the site's own styles or the other apps.
export default function AppFrame() {
  const { id } = useParams()
  const { lang, dir, t } = useL()
  const app = APPS.find((a) => a.id === id)
  if (!app) return <Navigate to="/apps" replace />

  const backArrow = dir === 'rtl' ? 'arrowRight' : 'arrowLeft'

  return (
    <div className="appframe" dir={dir}>
      <div className="appframe__bar">
        <Link to={`/apps/${app.id}`} className="appframe__back">
          <Icon name={backArrow} size={15} /> {t.appDetail.backToApps}
        </Link>
        <span className="appframe__title">
          <Icon name={app.icon} size={14} /> {app.name[lang]}
        </span>
        <span className="appframe__note">{t.appDetail.brainNote}</span>
      </div>
      <iframe
        key={app.id}
        className="appframe__iframe"
        src={app.url}
        title={app.name[lang]}
        allow="camera; microphone; clipboard-write"
      />
    </div>
  )
}

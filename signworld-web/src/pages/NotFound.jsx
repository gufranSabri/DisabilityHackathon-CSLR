import { Link } from 'react-router-dom'
import Icon from '../Icons'
import { useL } from '../useLangCtx'

export default function NotFound() {
  const { t } = useL()
  const n = t.notFound
  return (
    <section className="notfound">
      <div className="wrap">
        <span className="notfound__glyph">
          <svg viewBox="0 0 28 28" width="44" height="44" aria-hidden="true">
            <path d="M14 2 22 14 14 26 6 14Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 9 18 14 14 19 10 14Z" fill="currentColor" />
          </svg>
        </span>
        <h1>{n.title}</h1>
        <p>{n.body}</p>
        <Link to="/" className="btn btn--primary">{n.home}</Link>
      </div>
    </section>
  )
}

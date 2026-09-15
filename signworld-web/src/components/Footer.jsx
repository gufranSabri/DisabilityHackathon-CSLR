import { Link } from 'react-router-dom'
import { APP_PWA_URL } from '../content'
import { useL } from '../useLangCtx'
import LangToggle from './LangToggle'

export default function Footer() {
  const { t } = useL()
  const f = t.footer
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__wordmark">SignWorld · سِن وورلد</span>
          <p className="footer__tagline">{f.tagline}</p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <p className="footer__coltitle">{f.colPlatform}</p>
            <Link to="/brain">{f.brain}</Link>
            <Link to="/directory">{f.directory}</Link>
            <Link to="/widget">{f.widget}</Link>
          </div>
          <div className="footer__col">
            <p className="footer__coltitle">{f.colApps}</p>
            <Link to="/apps/education/open">{f.education}</Link>
            <Link to="/apps/medical/open">{f.medical}</Link>
            <Link to="/apps/children/open">{f.children}</Link>
            <Link to="/apps/publicSafety/open">{f.publicSafety}</Link>
          </div>
          <div className="footer__col">
            <p className="footer__coltitle">{f.colInstitutions}</p>
            <Link to="/toolkit">{f.toolkit}</Link>
            <Link to="/toolkit">{f.interpreters}</Link>
            <Link to="/widget">{f.integrate}</Link>
          </div>
          <div className="footer__col">
            <p className="footer__coltitle">{f.colAbout}</p>
            <Link to="/about">{f.about}</Link>
            <Link to="/about">{f.news}</Link>
            <Link to="/about">{f.faq}</Link>
            <a href={APP_PWA_URL} target="_blank" rel="noreferrer">{f.getApp}</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__disclaimer">{f.disclaimer}</p>
        <div className="footer__meta">
          <LangToggle />
          <span>© {year} SignWorld · {f.rights}</span>
        </div>
      </div>
    </footer>
  )
}

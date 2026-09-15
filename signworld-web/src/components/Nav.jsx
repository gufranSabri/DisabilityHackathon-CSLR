import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import LangToggle from './LangToggle'

const LINKS = [
  { to: '/brain', key: 'brain' },
  { to: '/apps', key: 'apps' },
  { to: '/directory', key: 'directory' },
  { to: '/toolkit', key: 'toolkit' },
  { to: '/widget', key: 'widget' },
]

export default function Nav() {
  const { t } = useL()
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__glyph">
            <svg viewBox="0 0 28 28" width="18" height="18" aria-hidden="true">
              <path d="M14 2 22 14 14 26 6 14Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M14 9 18 14 14 19 10 14Z" fill="currentColor" />
            </svg>
          </span>
          <span className="nav__wordmark">
            <b>SignWorld</b>
            <i>{t.footer.tagline}</i>
          </span>
        </Link>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <NavLink key={l.key} to={l.to} className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
              {t.nav[l.key]}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <NavLink to="/emergency" className="nav__emergency">
            <Icon name="siren" size={14} /> {t.nav.emergency}
          </NavLink>
          <LangToggle />
          <Link to="/get-the-app" className="btn btn--primary btn--sm">{t.nav.getApp}</Link>
          <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {LINKS.map((l) => (
              <NavLink key={l.key} to={l.to} className="nav__mlink" onClick={() => setOpen(false)}>
                {t.nav[l.key]}
              </NavLink>
            ))}
            <NavLink to="/emergency" className="nav__mlink nav__mlink--emergency" onClick={() => setOpen(false)}>
              <Icon name="siren" size={15} /> {t.nav.emergency}
            </NavLink>
            <Link to="/get-the-app" className="btn btn--primary" onClick={() => setOpen(false)}>{t.nav.getApp}</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

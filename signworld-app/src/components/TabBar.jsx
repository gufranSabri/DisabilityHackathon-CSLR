import { motion } from 'framer-motion'
import Icon from '../Icons'

// Bottom tab bar, Absher-style, with a raised center tab (Translate / camera).
export default function TabBar({ t, active, onNav }) {
  const tabs = [
    { key: 'home', icon: 'home', label: t.home },
    { key: 'services', icon: 'grid', label: t.services },
    { key: 'translate', icon: 'camera', label: t.translate, center: true },
    { key: 'bookings', icon: 'calendar', label: t.bookings },
    { key: 'me', icon: 'user', label: t.me },
  ]

  return (
    <nav className="tabbar">
      {tabs.map((tab) =>
        tab.center ? (
          <button
            key={tab.key}
            className={`tabbar__center ${active === tab.key ? 'is-on' : ''}`}
            onClick={() => onNav(tab.key)}
            aria-label={tab.label}
          >
            <motion.span className="tabbar__fab" whileTap={{ scale: 0.92 }}>
              <Icon name={tab.icon} size={24} />
            </motion.span>
            <span className="tabbar__centerlabel">{tab.label}</span>
          </button>
        ) : (
          <button
            key={tab.key}
            className={`tabbar__btn ${active === tab.key ? 'is-on' : ''}`}
            onClick={() => onNav(tab.key)}
          >
            <Icon name={tab.icon} size={20} />
            <span>{tab.label}</span>
          </button>
        ),
      )}
    </nav>
  )
}

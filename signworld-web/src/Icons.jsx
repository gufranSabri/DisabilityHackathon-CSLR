// Inline SVG icons — no network requests, scale cleanly on any screen.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const paths = {
  home: (
    <>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.2-1.8A1 1 0 0 1 9.5 4.8h5a1 1 0 0 1 .8.4L16.5 7h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5Z" />
      <circle cx="12" cy="13" r="3.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" />
      <path d="M8 14h3M8 17h6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  sos: (
    <>
      <path d="M12 3v2.2" />
      <path d="M5 21a7 7 0 0 1 14 0Z" />
      <path d="M12 9a4 4 0 0 0-4 4v3h8v-3a4 4 0 0 0-4-4Z" />
      <path d="m5.5 6.5 1.4 1.4M18.5 6.5l-1.4 1.4" />
    </>
  ),
  swap: (
    <>
      <path d="M7 4 3 8l4 4" />
      <path d="M3 8h13a4 4 0 0 1 0 8h-2" />
      <path d="m17 20 4-4-4-4" />
      <path d="M21 16H8" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4M9 21h6" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
      <path d="M8 12h8M8 16h5" />
    </>
  ),
  chat: (
    <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4V6a1 1 0 0 1 1-1Z" />
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  speaker: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9Z" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </>
  ),
  play: <path d="M8 5v14l11-7Z" />,
  pause: <path d="M8 5h3v14H8zM13 5h3v14h-3z" />,
  record: <circle cx="12" cy="12" r="7" fill="currentColor" stroke="none" />,
  school: (
    <>
      <path d="M12 3 2 8l10 5 10-5Z" />
      <path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" />
      <path d="M22 8v6" />
    </>
  ),
  cross: <path d="M12 4v16M4 12h16" strokeWidth="2.2" />,
  siren: (
    <>
      <path d="M12 3v2.2" />
      <path d="M5 21a7 7 0 0 1 14 0Z" />
      <path d="M12 9a4 4 0 0 0-4 4v3h8v-3a4 4 0 0 0-4-4Z" />
      <path d="m5.5 6.5 1.4 1.4M18.5 6.5l-1.4 1.4" />
    </>
  ),
  heart: (
    <path d="M12 20.5s-7.5-4.6-9.9-9.3C.6 7.9 2.4 4.5 5.8 4c2.1-.3 4 .8 6.2 3 2.2-2.2 4.1-3.3 6.2-3 3.4.5 5.2 3.9 3.7 7.2C19.5 15.9 12 20.5 12 20.5Z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.2c2.3.4 3.5 2.2 3.5 5.3" />
    </>
  ),
  kaaba: (
    <>
      <path d="M12 3 4 6.5v11L12 21l8-3.5v-11Z" />
      <path d="M4 6.5 12 10l8-3.5M12 10v11" />
      <path d="M4 13h16" opacity="0.6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  ),
  building: (
    <>
      <path d="M5 20V5.5A1.5 1.5 0 0 1 6.5 4h7A1.5 1.5 0 0 1 15 5.5V20" />
      <path d="M15 11h3.5A1.5 1.5 0 0 1 20 12.5V20" />
      <path d="M3 20h18" />
      <path d="M8 8h2M8 12h2M8 16h2" />
    </>
  ),
  phone: (
    <path d="M6.6 3.5 9.4 8a1.5 1.5 0 0 1-.4 2L7.3 11.7a13.6 13.6 0 0 0 5 5l1.7-1.7a1.5 1.5 0 0 1 2-.4l4.5 2.8a1.5 1.5 0 0 1 .5 2 3 3 0 0 1-2.9 1.8C10.6 21 3 13.4 2.3 5.9A3 3 0 0 1 4.1 3a1.5 1.5 0 0 1 2 .5Z" />
  ),
  hand: (
    <>
      <path d="M8 12.5V6a1.5 1.5 0 0 1 3 0v5" />
      <path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M14 11.2V6a1.5 1.5 0 0 1 3 0v7" />
      <path d="M17 13v-2a1.5 1.5 0 0 1 3 0v5c0 3.9-2.7 7-7 7-2.6 0-4-1-5.6-3L4 14.5c-.6-.9-.2-2 .8-2.3.7-.2 1.4 0 1.9.6L8 14.5" />
    </>
  ),
  avatar: (
    <>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M7 20c0-3.3 2.2-6 5-6s5 2.7 5 6" />
      <path d="M4 13 2 11M20 13l2-2" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z" />
      <path d="M18.5 15.5 19 17l1.5.5L19 18l-.5 1.5L18 18l-1.5-.5L18 17Z" />
    </>
  ),
  arrowRight: <path d="M5 12h13M12 5l7 7-7 7" />,
  arrowLeft: <path d="M19 12H6M12 5l-7 7 7 7" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  check: <path d="m5 13 4 4 10-10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  pin: (
    <>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </>
  ),
  pinFilled: (
    <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Zm0-9a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Z" fill="currentColor" stroke="none" />
  ),
  brain: (
    <>
      <path d="M9 4.5A2.5 2.5 0 0 0 6.5 7v.3A3 3 0 0 0 4 10.2v.6a3 3 0 0 0 1.3 2.5A3.2 3.2 0 0 0 5 14.5a3.5 3.5 0 0 0 3.5 3.5H9" />
      <path d="M15 4.5A2.5 2.5 0 0 1 17.5 7v.3A3 3 0 0 1 20 10.2v.6a3 3 0 0 1-1.3 2.5c.2.4.3.9.3 1.4a3.5 3.5 0 0 1-3.5 3.5H15" />
      <path d="M9 4.5v14M15 4.5v14" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.3 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.3-3.8-8.5S9.5 5.8 12 3.5Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v11M7 11l5 5 5-5" />
      <path d="M5 20h14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  code: <path d="m9 8-5 4 5 4M15 8l5 4-5 4M13 5l-2 14" />,
  layers: (
    <>
      <path d="M12 3 3 8l9 5 9-5Z" />
      <path d="m3 13 9 5 9-5M3 18l9 5 9-5" />
    </>
  ),
  quote: <path d="M7 7c-2 1-3 3-3 6h3v4H4v-4c0-4 1-7 3-8Zm10 0c-2 1-3 3-3 6h3v4h-3v-4c0-4 1-7 3-8Z" fill="currentColor" stroke="none" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  spark: (
    <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z" />
  ),
  flag: (
    <>
      <path d="M5 21V4M5 5h11l-2 4 2 4H5" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3h6v1M9 10h6M9 14h4" />
    </>
  ),
}

export default function Icon({ name, size = 24, className = '' }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" {...base}>
      {d}
    </svg>
  )
}

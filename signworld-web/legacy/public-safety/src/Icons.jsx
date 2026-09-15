// Inline SVG icons — no network requests, scale cleanly on any screen.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const paths = {
  hand: (
    <>
      <path d="M8 12.5V6a1.5 1.5 0 0 1 3 0v5" />
      <path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M14 11.2V6a1.5 1.5 0 0 1 3 0v7" />
      <path d="M17 13v-2a1.5 1.5 0 0 1 3 0v5c0 3.9-2.7 7-7 7-2.6 0-4-1-5.6-3L4 14.5c-.6-.9-.2-2 .8-2.3.7-.2 1.4 0 1.9.6L8 14.5" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5Z" />
      <circle cx="12" cy="12.5" r="3.6" />
    </>
  ),
  avatar: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20c0-4 3-6.5 6.5-6.5s6.5 2.5 6.5 6.5" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H5.5A1.5 1.5 0 0 1 4 15.5Z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H14a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h4.5a1.5 1.5 0 0 0 1.5-1.5Z" />
    </>
  ),
  school: (
    <>
      <path d="M12 3 2 8l10 5 10-5Z" />
      <path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" />
      <path d="M22 8v6" />
    </>
  ),
  chat: (
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5Z" />
  ),
  history: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v4h4" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.96 17.34a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.04 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9c.14.6.6 1.09 1.56 1.04H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1.96Z" />
    </>
  ),
  check: <path d="m5 13 4 4 10-10" />,
  arrowRight: <path d="M5 12h13M12 5l7 7-7 7" />,
  arrowLeft: <path d="M19 12H6M12 5l-7 7 7 7" />,
  sparkle: (
    <>
      <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z" />
      <path d="M18.5 15.5 19 17l1.5.5L19 18l-.5 1.5L18 18l-1.5-.5L18 17Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.2c2.3.4 3.5 2.2 3.5 5.3" />
    </>
  ),
  star: (
    <path d="m12 4 2.3 4.9 5.2.7-3.8 3.6 1 5.2-4.7-2.6-4.7 2.6 1-5.2-3.8-3.6 5.2-.7Z" />
  ),
  play: <path d="M8 5.5v13l11-6.5Z" />,
  phone: (
    <path d="M6.6 3.5 9.4 8a1.5 1.5 0 0 1-.4 2L7.3 11.7a13.6 13.6 0 0 0 5 5l1.7-1.7a1.5 1.5 0 0 1 2-.4l4.5 2.8a1.5 1.5 0 0 1 .5 2 3 3 0 0 1-2.9 1.8C10.6 21 3 13.4 2.3 5.9A3 3 0 0 1 4.1 3a1.5 1.5 0 0 1 2 .5Z" />
  ),
  siren: (
    <>
      <path d="M12 3v2.2" />
      <path d="M5 21a7 7 0 0 1 14 0Z" />
      <path d="M12 9a4 4 0 0 0-4 4v3h8v-3a4 4 0 0 0-4-4Z" />
      <path d="m5.5 6.5 1.4 1.4M18.5 6.5l-1.4 1.4" />
    </>
  ),
  broadcast: (
    <>
      <circle cx="12" cy="12" r="2.4" />
      <path d="M8.3 15.7a5.2 5.2 0 0 1 0-7.4M15.7 8.3a5.2 5.2 0 0 1 0 7.4" />
      <path d="M5.3 18.7a9.7 9.7 0 0 1 0-13.4M18.7 5.3a9.7 9.7 0 0 1 0 13.4" />
    </>
  ),
  shield: (
    <path d="M12 3.3 19 6v5.5c0 4.6-3 8.2-7 9.2-4-1-7-4.6-7-9.2V6Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  send: <path d="M4.5 12 20 4.5 15 20l-3.3-6.2L4.5 12Zm6.2 1.8L20 4.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  flame: (
    <path d="M12 3c1 3-3 4.5-3 8a3 3 0 0 0 6 0c0-1.2-.6-2-1.1-2.7 1.9.7 3.1 2.7 3.1 4.9a5 5 0 0 1-10 0C7 9.5 9.5 6.5 12 3Z" />
  ),
  cross: <path d="M12 4v16M4 12h16" strokeWidth="2.4" />,
  alertOctagon: (
    <>
      <path d="M8 3h8l5 5v8l-5 5H8l-5-5V8Z" />
      <path d="M12 8v5M12 16v.1" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v-3.5l1.8-4A2 2 0 0 1 7.6 7.3h8.8a2 2 0 0 1 1.8 1.2l1.8 4V16" />
      <path d="M4 16a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1H4Zm16 0a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1h3Z" />
      <path d="M6.5 12.5h11" />
      <circle cx="7.5" cy="16" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="16" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  ambulance: (
    <>
      <path d="M3 16V8a1 1 0 0 1 1-1h9v9" />
      <path d="M13 10h4.5l2.5 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="17" cy="17.5" r="1.6" />
      <path d="M6.5 5.5v3M5 7h3" />
    </>
  ),
  map: (
    <>
      <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </>
  ),
}

export default function Icon({ name, size = 24, className = '' }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...base}
    >
      {d}
    </svg>
  )
}

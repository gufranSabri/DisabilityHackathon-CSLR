// Inline SVG icons — no network requests, scale cleanly on any screen.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
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
  close: <path d="M6 6l12 12M18 6 6 18" />,
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
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
      <path d="M7 5.5H4a3 3 0 0 0 3.6 3.4M17 5.5h3a3 3 0 0 1-3.6 3.4" />
      <path d="M12 14v3M9 20.5h6M9.8 20.5c-.3-1.4-.1-2.3.4-3h3.6c.5.7.7 1.6.4 3" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="9" width="17" height="4" rx="1" />
      <path d="M4.5 13h15v7.5a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1Z" />
      <path d="M12 9v12.5" />
      <path d="M12 9c-1.4-4-6.5-4-6.5-.7 0 2 2.4 1.4 6.5.7ZM12 9c1.4-4 6.5-4 6.5-.7 0 2-2.4 1.4-6.5.7Z" />
    </>
  ),
  flame: (
    <path d="M12 3c1 3-3 4.5-3 8a3 3 0 0 0 6 0c0-1.2-.6-2-1.1-2.7 1.9.7 3.1 2.7 3.1 4.9a5 5 0 0 1-10 0C7 9.5 9.5 6.5 12 3Z" />
  ),
  heart: (
    <path d="M12 20.5s-7.5-4.6-9.9-9.3C.6 7.9 2.4 4.5 5.8 4c2.1-.3 4 .8 6.2 3 2.2-2.2 4.1-3.3 6.2-3 3.4.5 5.2 3.9 3.7 7.2C19.5 15.9 12 20.5 12 20.5Z" />
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.4" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </>
  ),
  next: <path d="M9 5l7 7-7 7" />,
  prev: <path d="M15 5l-7 7 7 7" />,
  home: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-5.5h4V20h3a1 1 0 0 0 1-1v-9" />
    </>
  ),
  paw: (
    <>
      <circle cx="7" cy="9" r="2.1" />
      <circle cx="12.3" cy="6.5" r="2.1" />
      <circle cx="17.6" cy="9" r="2.1" />
      <path d="M12.3 12.5c-3.6 0-6 2.3-6 4.7 0 1.6 1.4 2.8 3 2.3 1-.3 1.9-.7 3-.7s2 .4 3 .7c1.6.5 3-.7 3-2.3 0-2.4-2.4-4.7-6-4.7Z" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.9 1.4-1.9-.3-.7 0-1.5.8-1.7A5 5 0 0 0 18 13a9 9 0 0 0-6-10Z" />
      <circle cx="8" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  hash: (
    <>
      <path d="M9 4 7 20M17 4l-2 16M4 9h16M3.5 15h16" />
    </>
  ),
  users2: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.2c2.3.4 3.5 2.2 3.5 5.3" />
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

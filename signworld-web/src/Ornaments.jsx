// Sadu-weave triangle tiling — the Saudi folk-textile motif used across the
// SignWorld suite, kept here as a restrained texture layer so the app still
// reads as this family's parent while staying institution-clean overall.

export function SaduField({ opacity = 0.03, color = '#0b7a4b' }) {
  return (
    <svg className="geo-field" aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id="sadu" width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="0.9">
            <path d="M0 16 16 0 32 16 48 0 64 16" />
            <path d="M0 48 16 32 32 48 48 32 64 48" />
            <path d="M16 32 24 16 32 32Z" />
            <path d="M48 0 56 16 64 0Z" opacity="0.6" />
            <path d="M0 64 8 48 16 64Z" opacity="0.6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sadu)" />
    </svg>
  )
}

export function Divider({ color = '#0b7a4b' }) {
  return (
    <svg viewBox="0 0 200 16" className="divider" aria-hidden="true" fill="none">
      <g stroke={color} strokeWidth="1" opacity="0.4">
        <path d="M0 8h72M128 8h72" />
        <path d="M100 2 106 8 100 14 94 8Z" />
        <path d="M84 4 88 8 84 12 80 8Z" opacity="0.7" />
        <path d="M116 4 120 8 116 12 112 8Z" opacity="0.7" />
      </g>
    </svg>
  )
}

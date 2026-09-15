// Decorative SVG: Sadu-weave triangle tiling (Najdi loom motif) + a divider mark.
// Kept deliberately restrained here — Public Safety is the most "official
// government digital service" register of the suite, so the field opacity
// is dialed down further than the other apps and the divider is unadorned.

export function SaduField({ opacity = 0.045, color = '#e3a83b' }) {
  return (
    <svg className="geo-field" aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id="sadu" width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="0.9">
            {/* Sadu zigzag band */}
            <path d="M0 16 16 0 32 16 48 0 64 16" />
            <path d="M0 48 16 32 32 48 48 32 64 48" />
            {/* stacked triangle motif, characteristic of Sadu weaving */}
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

export function Divider({ color = '#e3a83b' }) {
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

// Slow-drifting dust/light motes used on active "signing" states.
export function Motes({ count = 14 }) {
  return (
    <div className="motes" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 9) * 0.9}s`,
            animationDuration: `${9 + (i % 5) * 2.5}s`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
          }}
        />
      ))}
    </div>
  )
}

// Decorative SVG: Sadu-weave triangle tiling (Najdi loom motif) + a palm-frond mark.
// This replaces girih-tile / mosque-arch ornamentation with Saudi folk-textile motifs.

export function SaduField({ opacity = 0.06, color = '#1f8a5c' }) {
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

export function PalmMark({ className = '', stroke = '#1f8a5c' }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true" fill="none">
      <path d="M60 150V70" stroke={stroke} strokeWidth="1.4" opacity="0.55" />
      <path
        d="M60 76C60 76 34 62 20 34M60 76C60 76 86 62 100 34M60 66C60 66 40 50 30 24M60 66C60 66 80 50 90 24M60 58C60 58 46 42 40 18M60 58C60 58 74 42 80 18"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}

export function Divider({ color = '#1f8a5c' }) {
  return (
    <svg viewBox="0 0 200 16" className="divider" aria-hidden="true" fill="none">
      <g stroke={color} strokeWidth="1" opacity="0.5">
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

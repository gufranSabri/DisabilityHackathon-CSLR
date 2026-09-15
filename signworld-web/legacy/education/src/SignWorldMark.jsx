// Shared suite identity: a small Sadu-diamond glyph + wordmark, reused
// (copy-pasted, recolored per app) across all four SignWorld apps so the
// "one brain, four faces" pitch reads clearly when demoed back to back.
export default function SignWorldMark({ app = '', lang = 'ar', accent = 'var(--copper-soft)' }) {
  return (
    <div className="sw-mark">
      <svg viewBox="0 0 28 28" width="22" height="22" aria-hidden="true">
        <path
          d="M14 2 22 14 14 26 6 14Z"
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
        />
        <path d="M14 9 18 14 14 19 10 14Z" fill={accent} opacity="0.85" />
      </svg>
      <span className="sw-mark__text">
        <b>SignWorld</b>
        {app && <i>{app}</i>}
      </span>
    </div>
  )
}

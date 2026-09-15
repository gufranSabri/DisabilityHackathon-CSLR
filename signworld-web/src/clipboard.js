// Copy text to the clipboard, tolerating environments where the async API is
// blocked (headless, insecure context). Falls back to a hidden textarea.
export function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => legacyCopy(text))
      return
    }
  } catch { /* fall through */ }
  legacyCopy(text)
}

function legacyCopy(text) {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  } catch { /* give up silently */ }
}

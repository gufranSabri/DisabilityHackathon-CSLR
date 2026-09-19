#!/usr/bin/env node
// The avatar stack (Avatar3D + IK retargeting + sign library/matching) lives
// in signworld-web/src and is copied verbatim into signworld-app and the four
// legacy mini-apps (which use a flat src/ and their own Icons).
// Run after editing any of the source files:  npm run sync:avatar
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const web = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const app = path.join(path.dirname(web), 'signworld-app')
const legacy = ['children', 'education', 'medical', 'public-safety'].map((d) => path.join(web, 'legacy', d))

const FILES = [
  ['src/components/Avatar3D.jsx', 'components/Avatar3D.jsx'],
  ['src/lib/signRetarget.js', 'lib/signRetarget.js'],
  ['src/lib/signs.js', 'lib/signs.js'],
  ['src/lib/signLibrary.js', 'lib/signLibrary.js'],
]

const flat = (s) =>
  s.replaceAll("'../Icons'", "'./Icons'")
    .replaceAll("'../lib/signRetarget'", "'./signRetarget'")
    .replaceAll("'../lib/signs'", "'./signs'")
    .replaceAll('../lib/signRetarget.js', './signRetarget.js')

function put(dest, text) {
  mkdirSync(path.dirname(dest), { recursive: true })
  writeFileSync(dest, text)
}

for (const [src, rel] of FILES) {
  const text = readFileSync(path.join(web, src), 'utf8')
  put(path.join(app, 'src', rel), text)
  for (const l of legacy) put(path.join(l, 'src', path.basename(rel)), flat(text))
}
console.log(`[sync-avatar] ${FILES.length} files → app + ${legacy.length} legacy apps`)

#!/usr/bin/env node
// Builds each embedded legacy app (old/*, copied under legacy/*) and copies
// its static output into public/legacy/<id>/, where the site's AppFrame
// pages load them in an <iframe>. Run automatically via `predev`/`prebuild`.
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, cpSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const legacyRoot = path.join(root, 'legacy')
const publicLegacyRoot = path.join(root, 'public', 'legacy')

// dir name under legacy/ -> id used as the public/legacy/<id> mount path
const APPS = {
  education: 'education',
  medical: 'medical',
  children: 'children',
  'public-safety': 'publicSafety',
}

mkdirSync(publicLegacyRoot, { recursive: true })

for (const [dir, id] of Object.entries(APPS)) {
  const appDir = path.join(legacyRoot, dir)
  if (!existsSync(appDir)) {
    console.warn(`[build-legacy] skipping ${dir} — not found at ${appDir}`)
    continue
  }

  const nodeModules = path.join(appDir, 'node_modules')
  if (!existsSync(nodeModules)) {
    console.log(`[build-legacy] installing deps for ${dir}...`)
    execSync('npm install --no-audit --no-fund', { cwd: appDir, stdio: 'inherit' })
  }

  console.log(`[build-legacy] building ${dir} -> legacy/${dir}/dist`)
  execSync('npm run build', { cwd: appDir, stdio: 'inherit' })

  const dist = path.join(appDir, 'dist')
  const dest = path.join(publicLegacyRoot, id)
  rmSync(dest, { recursive: true, force: true })
  cpSync(dist, dest, { recursive: true })
  console.log(`[build-legacy] copied to public/legacy/${id}`)
}

console.log('[build-legacy] done.')

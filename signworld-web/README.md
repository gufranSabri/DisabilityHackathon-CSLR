# SignWorld Web

The **website counterpart** to the `signworld-app/` PWA — the public face of the SignWorld
platform. Not a scaled-up app: top nav + footer instead of a bottom tab bar, no personal
account, real routed pages, an institutions portal, and the four flagship apps **embedded
directly** in the site (not just linked to).

Supersedes `../old/signworld-hub`. See `../WEB_PLAN.md` for the full plan. **All pages built.**

## Run

```bash
npm install
npm run dev      # builds the 4 legacy apps, then http://localhost:5200
npm run build
npm run preview
```

`npm run dev` / `npm run build` first run `build-legacy` (see below), which installs deps
and builds each of the four flagship apps and copies their output into
`public/legacy/<id>/`. That step is skipped in dependency-install if `node_modules` already
exists for a given app, so repeat runs are fast; delete `legacy/<dir>/node_modules` to force
a clean reinstall. The mobile PWA (`../signworld-app`) is a separate app, still its own dev
server on port 5300 — "Get the app" / SOS links open it in a new tab.

## The four flagship apps are embedded, not linked

`legacy/<dir>/` (education, medical, children, public-safety — copied from `../old/`) are
each still fully independent Vite/React apps with their own `App.jsx`, `content.js`, and CSS
tokens (`--ink`, `--accent`, etc. that collide across apps and with the site's own tokens).
Rather than rewrite them to share the site's styling — which would risk subtle visual bugs
bleeding between four differently-themed apps and the site — each is built as its own static
bundle and rendered in an `<iframe>` at `/apps/:id/open` (`AppFrame.jsx`). That gives:

- Zero CSS/JS collision: each app runs in its own document, fonts and all.
- No changes needed to the four apps' internals — they're copied as-is into `legacy/`.
- A page that still feels like navigating to that app inside SignWorld: a thin top bar
  ("← All apps · [app name]") sits above the iframe, no separate host/port involved.

`scripts/build-legacy.mjs` does the building/copying; see `vite.config.js` in each
`legacy/<dir>` — each sets `base: '/legacy/<id>/'` so its built asset URLs resolve correctly
under the site's own origin. **Important:** `AppFrame`'s iframe `src` (`APP_URLS` in
`content.js`) points at the explicit `index.html` filename, not just the directory path —
Vite's dev-server HTML middleware intercepts directory-style requests to any `index.html`
and serves the *site's* own dev entry instead of the static file in `public/`; requesting
the file by name sidesteps that and works identically in dev and in a production build.

To change one of the four apps, edit its source under `legacy/<dir>/src/`, then re-run
`npm run build-legacy` (or just `npm run dev`/`build`, which do it automatically) to
regenerate `public/legacy/<id>/`.

## Tech

- Vite + React 18 + framer-motion + **react-router-dom** (`createHashRouter` — real
  shareable `#/…` URLs, which a website needs).
- Ports `useLang.js`, `Icons.jsx`, `Ornaments.jsx`, `CameraCapture.jsx`, `AvatarStage.jsx`
  from `signworld-app`. Bilingual `{ ar, en }`, RTL, default Arabic, persisted.
- `CameraCapture` starts the real camera (`getUserMedia`) as soon as it mounts (not gated
  behind pressing "Start") — the widget demo shows a genuinely live feed immediately;
  `active` only gates the scan overlay and the simulated recognition timer.
- One `styles.css` — website scale (1180px content, multi-column grids, larger type ramp),
  reusing the app's green/`#0b7a4b` token palette. Light-only.
- Everything hardcoded in `src/content.js`. No backend, no auth, no analytics.

## Routes

| Route | Page |
|---|---|
| `/` | **Landing** — hero (looping avatar), the Brain (4 capability cards), the 4 flagship apps, situational-directory chips, live widget teaser, impact bar, institutions CTA |
| `/brain` | **The Brain** — the infrastructure argument, "Sign Language as a Service", 4 capabilities table, conceptual architecture (Brain → pose / sequence / renderer / NLU over a national corpus), links to all apps + widget |
| `/apps` | **Apps index** — the 4 apps, large cards with preview images |
| `/apps/:id` | **App detail** (education · medical · children · publicSafety) — verbatim impact line from the plan PDF, preview image, "how it works" steps, audience chips, conceptual integration, **"Open the app"** → `/apps/:id/open` |
| `/apps/:id/open` | **Embedded app** (`AppFrame.jsx`) — the actual flagship app, full-screen, in an iframe, with a thin back bar. No site nav/footer chrome. |
| `/directory` | **Situational directory** — 7 life-moment cards + a sticky "not sure where to start?" rail |
| `/directory/:moment` | **One moment** (school · hospital · emergency · family · employment · everyday · hajj) — tool cards: SignWorld apps (→ `/apps/:id/open`), gov services (inline "how SignWorld helps here" explainer), community resources |
| `/toolkit` | **Employer & School Toolkit** — hardcoded request form (→ `.json` download), one-line widget embed snippet + copy, bulk interpreter request form |
| `/widget` | **Embeddable widget** — live `WidgetDemo` (ported `CameraCapture`/`AvatarStage`, real camera feed, simulated recognition) with theme/lang/size config that restyles the frame, embed snippet + 3-line SDK code |
| `/emergency` | **In an emergency** — calm red page: 911/937 story, what SignWorld pre-attaches, signed "what to do while you wait", opens the app's SOS (external, `signworld-app`), no-phone VRS fallback |
| `/about` | **About & impact** — vision, Vision 2030 / SDAIA alignment, impact stats, 3 illustrative news cards, FAQ accordion, credits |
| `/get-the-app` | phone mockup, feature list, placeholder store badges, **"Open the web app"** → the actual PWA (`http://localhost:5300`, external), illustrative QR |
| `*` | NotFound |

## Global chrome

- **Nav** (`Nav.jsx`) — sticky, wordmark + The Brain / Apps / Directory / For Institutions /
  Widget, a small red "In an emergency" link, lang toggle, filled "Get the app". Hamburger
  menu below 940px.
- **Footer** — 4 link columns (the "Apps" column links to each app's `/apps/:id/open`) +
  the disclaimer: *"SignWorld is a concept prototype for a hackathon. Not an official
  government product. Alignment with Vision 2030, the Quality of Life Program, and SDAIA is
  illustrative."*

## Structure

```
signworld-web/
  scripts/build-legacy.mjs   # builds legacy/* and copies output into public/legacy/*
  legacy/
    education/  medical/  children/  public-safety/   # copied from ../old/*, each its own Vite app
  public/legacy/               # generated — built output of the 4 apps, gitignored
  src/
    App.jsx              # createHashRouter + all routes (AppFrame outside the main Layout)
    content.js            # ALL hardcoded bilingual data (APPS, BRAIN, MOMENTS, TOOLS, TOOLKIT, WIDGET, IMPACT, NEWS, FAQ, CONTENT)
    useLang.js  useLangCtx.jsx   # ported + a context wrapper so pages share one lang state
    clipboard.js          # copy helper with textarea fallback
    Icons.jsx  Ornaments.jsx  components/CameraCapture.jsx  components/AvatarStage.jsx   # ported
    components/
      Layout  Nav  Footer  LangToggle
      Section  AppCard  ToolCard  StatBar  Accordion  WidgetDemo
    pages/
      Landing  Brain  Apps  AppDetail  AppFrame  Directory  DirectoryMoment
      Toolkit  Widget  Emergency  About  GetTheApp  NotFound
  public/shots/            # placeholder preview SVGs per app + the phone mockup
```

## Non-goals

No real backend, forms, analytics, auth, or account. No live ML — the widget demo's
recognition is the same simulation as the app (only the camera feed itself is real).
News/FAQ are hardcoded arrays. The four flagship apps are embedded as-is, not rewritten to
share the site's design system.

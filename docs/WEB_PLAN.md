# SignWorld Web — Build Plan

> **STATUS:** Built. All routes and pages complete in `signworld-web/` (port 5200).
> See `signworld-web/README.md` for the as-built summary. Build passes, all routes
> smoke-tested with zero console errors.
>
> **Update:** the four flagship apps (`old/education`, `old/medical`, `old/children`,
> `old/public-safety`) were copied into `signworld-web/legacy/` and are now **embedded
> directly** in the site via `<iframe>` at `/apps/:id/open`, built by
> `scripts/build-legacy.mjs` — not just linked to an external dev server. "Open the app"
> everywhere in the site (AppCard, ToolCard, footer, app detail) now routes internally to
> that page. Only the mobile PWA (`signworld-app`, port 5300) is still opened externally,
> from "Get the app" / the emergency SOS button. The widget demo's camera now plays
> immediately on mount instead of staying blank until "Start" is pressed.


The **website counterpart** to the `signworld-app/` PWA. Not a scaled-up app: it's the
public face of the SignWorld platform — a place the general public, institutions, press,
and Deaf citizens all land, understand what SignWorld is, and get routed to the right tool.

Supersedes `old/signworld-hub` (which was a thin 4-app marketing page). This is the real
national-platform site, and the proper home for the four flagship apps in `old/`.

> The mobile PWA is the citizen's *pocket tool*. This site is the *platform*: it explains
> the Brain, hosts the widget/SDK story, runs the situational directory at desktop scale,
> gives institutions a portal, and launches each of the four apps.

---

## What's different from the app (deliberately)

| App (PWA) | Website |
|---|---|
| Bottom tab bar, 5 tabs | Top nav bar + footer; multi-section scrolling pages + routed sub-pages |
| Raised camera tab is the centerpiece | Sign2Text/Text2Sign shown as an **embeddable widget demo** on one page, not the star |
| Emergency SOS floating pill everywhere | A calm "In an emergency" page with the 999/937 story + link to open the app |
| Personal: My profile, medical card, history | No personal account. Institutions get a **portal**; citizens get **"Get the app"** |
| One long dashboard Home | A proper **landing page** with hero, the Brain, the 4 apps, situational directory, impact |
| Deep-link nav stack | Real routes (`/apps/education`, `/directory/hospital`, `/toolkit`, `/brain` …) |
| Simulated camera viewfinder | Widget demo uses the **same** `CameraCapture`/`AvatarStage` primitives, still simulated |

Shared DNA: same green (`#0b7a4b`), same Tajawal/Manrope, same Sadu ornament, same
bilingual `{ ar, en }` + RTL, same "conceptual SDAIA/Vision 2030" framing, same
hardcoded-everything rule.

---

## Tech

| Piece | Decision |
|---|---|
| Build | Vite + React 19 + `framer-motion` (match `old/` and the app) |
| Routing | **`react-router-dom`** (`createHashRouter`) — real URLs, back/forward, deep links. A website needs shareable URLs; the app's custom stack router does not fit here. |
| i18n | Port `useLang.js` from the app (bilingual, RTL, persisted, default **Arabic**) |
| Styling | New `styles.css` design system — **website scale**: 1200px max content, multi-column grids, larger type ramp, generous section rhythm. Reuses the app's color tokens. |
| Primitives | Port `Icons.jsx`, `Ornaments.jsx`, `CameraCapture.jsx`, `AvatarStage.jsx` from `signworld-app` |
| Data | One `content.js` — all hardcoded bilingual (apps registry, directory, toolkit, brain, impact, news, FAQ) |
| The 4 old apps | Each keeps its own dev server (ports 5301–5304). The site links to them by URL (`APP_URLS`), exactly like `old/signworld-hub` did. Also: a **screenshot/preview** per app on its detail page. |
| Port | 5200 (5300 = app, 5301–5304 = the four apps) |
| Deploy | here.now |

### File structure

```
signworld-web/
  index.html                 # fonts, theme-color, og tags
  vite.config.js             # port 5200
  public/
    favicon.svg
    shots/                    # static preview images per app (placeholder art)
  src/
    main.jsx  App.jsx        # router + Layout (Nav + Footer + <Outlet/>)
    content.js               # ALL hardcoded bilingual data
    useLang.js               # ported
    Icons.jsx  Ornaments.jsx
    components/
      Nav.jsx  Footer.jsx  LangToggle.jsx
      Section.jsx  SectionHead.jsx
      AppCard.jsx  ToolCard.jsx  StatBar.jsx  Accordion.jsx
      WidgetDemo.jsx          # the embeddable Sign2Text/Text2Sign demo (uses CameraCapture/AvatarStage)
      CameraCapture.jsx  AvatarStage.jsx   # ported
    pages/
      Landing.jsx
      Brain.jsx
      Apps.jsx   AppDetail.jsx
      Directory.jsx   DirectoryMoment.jsx
      Toolkit.jsx
      Widget.jsx
      Emergency.jsx
      About.jsx
      GetTheApp.jsx
      NotFound.jsx
    styles.css
```

---

## Routes & pages

### `/` — Landing
The one-scroll story of the platform.
- **Hero** — headline ("One national brain for Saudi Sign Language"), sub, two CTAs:
  *Explore the apps* / *Get the mobile app*. Small trust line (conceptual SDAIA / Vision 2030).
  Right side: a looping `AvatarStage` signing a rotating phrase.
- **The Brain (condensed)** — 3 capability cards (Sign→Text, Text→Sign, Sign→Sign) with a
  link to the full `/brain` page. One diagram (inline SVG, reuse the ring visual idea).
- **Four flagship apps** — grid of 4 `AppCard`s (Education, Medical, Children, Public Safety),
  each: icon, name, one-line, an impact stat, "Open app" (→ its dev URL) + "Learn more" (→ `/apps/:id`).
- **Situational directory (preview)** — the life-moment chips (School, Hospital, Emergency,
  Raising a Deaf child, Employment, Everyday, Hajj) → link into `/directory`.
- **The widget** — teaser: "Embed SignWorld in your own service" → `/widget`, with a small
  live `WidgetDemo` inline.
- **Impact band** — `StatBar`: classrooms connected, ER kiosks, 24/7 coverage, interpreters
  in directory, pilgrims served (all illustrative, labelled).
- **For institutions** — one card → `/toolkit`.
- **Footer** everywhere: nav columns, language toggle, "conceptual alignment" disclaimer,
  "Get the app" buttons (App Store / Google Play — non-functional placeholders).

### `/brain` — The Brain
The platform-as-infrastructure argument (from `old/hackathon_SL_plan.pdf`).
- Vision statement, the "Sign Language as a Service" framing.
- **Four capabilities** table (direction + description), each with a mini `AvatarStage` /
  `CameraCapture` illustration.
- **Conceptual architecture** — the ASCII diagram from the plan, redrawn as a clean inline
  SVG (Brain → pose estimation / sequence transformer / avatar renderer / Arabic NLU-TTS,
  over a national corpus).
- "One engine, all these tools" — links out to the 4 apps + the widget.
- National-corpus / crowdsourcing note.

### `/apps` — Apps index
- Intro: "One brain, four faces."
- The 4 `AppCard`s again, larger, with the preview screenshot.
- Note that each is a thin client calling the same API.

### `/apps/:id` — App detail (education | medical | children | public-safety)
Per-app page, data from `content.js` `APPS`:
- Hero: name, tagline, the impact line (verbatim from the plan PDF), **"Open the app"**
  button → dev URL (`APP_URLS[id]`), opens in a new tab.
- Preview image (`public/shots/<id>.png` — simple branded placeholder we generate).
- **How it works** — 3–4 steps (bilingual), each with an icon.
- **Who it's for** — audience chips.
- **Conceptual integration** — the real framing ("integrates with Madrasati", "deployable
  via Seha", etc.) clearly marked conceptual.
- Related: link to `/directory/<moment>` and to `/brain`.

### `/directory` — Situational directory (desktop scale)
The `old/signworld-hub` idea, done properly for a wide screen.
- Section head + the 7 life-moment cards in a grid (not a scroll strip).
- Each card → `/directory/:moment`.
- A "pin" affordance is dropped here (that's an app feature). Instead: a persistent
  right-rail "Not sure where to start? → Get the app / Contact us".

### `/directory/:moment` — One life moment
(school | hospital | emergency | family | employment | everyday | hajj)
- Heading + the situation's descriptive paragraph.
- Grid of `ToolCard`s: SignWorld apps (→ dev URL), gov services (→ short explainer inline,
  no separate route), community resources. Same registry shape as the app's `SERVICES`,
  ported and trimmed to what makes sense on a site.
- "In an emergency" moment links prominently to `/emergency`.

### `/toolkit` — Employer & School Toolkit
The institutions portal (from the Ahmed spec's web-app section).
- What institutions can request: accessibility support, **bulk interpreter requests**,
  **embed the Sign2Text/Text2Sign widget** (SDK story).
- **Request form** (hardcoded, no backend): org name, sector (school / hospital / ministry /
  private), what you need (checkboxes), contact, notes → on submit, a success panel
  ("We'll be in touch") + the payload shown as a downloadable `.json` (mirrors the app's
  `.ics`/`.txt` pattern — real client-side download, nothing sent).
- **Widget snippet** — a copy-to-clipboard `<script src="https://cdn.signworld…/widget.js">`
  block (illustrative) + link to `/widget` for the live demo.
- Interpreter bulk request — a second small form (number of interpreters, languages, dates).

### `/widget` — The embeddable widget
- Explains the SDK/widget version of the Brain.
- **Live `WidgetDemo`** front and center: a bordered "embedded" frame with a mode switch
  (Sign→Text / Text→Sign), using the ported `CameraCapture` (real viewfinder, simulated
  recognition) and `AvatarStage`. This is the same component an institution would embed.
- Config options shown as a faux panel (theme, language, size) that actually restyle the
  demo frame.
- Copy-paste embed snippet + a tiny "integration in 3 lines" code block.

### `/emergency` — In an emergency
Calm, high-contrast, single-purpose (the website's answer to the app's SOS pill).
- Big statement: "If you are Deaf and need emergency help in Saudi Arabia."
- The 911 / 937 story, what SignWorld pre-attaches (location, medical, comm mode).
- **"Open SignWorld SOS"** button → deep link to the app (`http://localhost:5300/` for the
  demo; framed as "opens the app").
- "What to do while you wait" — signed guidance (`AvatarStage`) + written steps (reuse the
  app's Pass 2 SOS guidance copy).
- Fallback: "No smartphone? " → VRS / text-relay info.

### `/about` — About & impact
- The vision paragraphs, Vision 2030 / Quality of Life alignment, SDAIA-as-conceptual-steward.
- Impact numbers with context.
- **News** — 3–4 dated illustrative press items (launch, MOH pilot, Hajj deployment) as cards.
- **FAQ** — `Accordion`: "Is this a real government product?" (no — conceptual prototype),
  "Which sign language?", "Is my video stored?", "How do I integrate it?", "Is it free?".
- Credits.

### `/get-the-app` — Get the mobile app
- Phone mockup frame showing a screenshot of the PWA (`public/shots/app.png`).
- Feature list (Sign2Text, Text2Sign, SOS, bookings, document assistant, deaf chat).
- Store badges (placeholder) + "Open the web app" → `http://localhost:5300/`.
- QR code (static SVG, illustrative).

### `*` — NotFound
Simple, on-brand, link home.

---

## Global chrome

### Nav (`Nav.jsx`)
Sticky top bar:
- Left: SignWorld wordmark + "National Platform" tag.
- Center/right: **The Brain · Apps · Directory · For Institutions · Widget**.
- Far right: `LangToggle` + a filled **"Get the app"** button.
- Mobile (< 900px): hamburger → slide-down menu. (This site is desktop-first but must not
  break on a phone.)
- "In an emergency" is a small red text link in the nav, always visible → `/emergency`.

### Footer (`Footer.jsx`)
4 columns (Platform / Apps / Institutions / About) + a bottom row: language toggle,
copyright, and the disclaimer: *"SignWorld is a concept prototype for a hackathon. Not an
official government product. Alignment with Vision 2030, the Quality of Life Program, and
SDAIA is illustrative."*

---

## Content model — `src/content.js`

| Export | Shape |
|---|---|
| `APP_URLS` | `{ education, medical, children, publicSafety }` → dev URLs (5301–5304), same as `old/signworld-hub` |
| `APPS` | `{ id, icon, accent, name, tagline, impactLine, audience[], steps[], integration, moment }` — the 4 flagship apps |
| `BRAIN` | `{ vision, capabilities: [{ dir, name, desc }], architecture nodes }` |
| `MOMENTS` | 7 life-moments: `{ id, icon, title, body, tools: [toolId] }` (ported from app `SITUATIONS`) |
| `TOOLS` | registry: `{ id, kind: 'app'|'gov'|'resource', icon, name, tagline, body, href? , explainer? }` (ported/trimmed from app `SERVICES`) |
| `TOOLKIT` | sectors[], needs[] (checkbox options), widget snippet string, interpreter-request fields |
| `WIDGET` | demo phrases, config options, embed snippet, 3-line integration code |
| `IMPACT` | stat tiles `{ value, label }` |
| `NEWS` | `[{ date, tag, title, body }]` |
| `FAQ` | `[{ q, a }]` |
| `CONTENT` | all UI strings keyed by page/component, bilingual |

Same conventions as the app: functional components, one stylesheet, `motion` variants at
module top, `Icon` name-keyed map, `t.<page>.<key>`, nothing claims a real partnership.

---

## Build order

1. Scaffold Vite + `react-router-dom`; port `useLang`, `Icons`, `Ornaments`,
   `CameraCapture`, `AvatarStage`. `styles.css` base (tokens + website type ramp + layout).
2. `App.jsx` router + `Layout` (`Nav` + `Footer` + `<Outlet/>` + scroll-to-top on route
   change). `Nav` (desktop + mobile menu), `Footer`, `LangToggle`.
3. `content.js` skeleton with real bilingual copy.
4. **Landing** — all sections. Shared `Section`/`SectionHead`, `AppCard`, `StatBar`.
5. **Apps** index + **AppDetail** (×4, data-driven). Generate placeholder preview images.
6. **Brain** page + the architecture SVG.
7. **Directory** + **DirectoryMoment** (port `TOOLS`/`MOMENTS`).
8. **Widget** page + `WidgetDemo` component.
9. **Toolkit** page + the two hardcoded forms + `.json` download + copy-snippet.
10. **Emergency**, **About** (+ `Accordion`, `NEWS`), **GetTheApp**, **NotFound**.
11. Polish: OG/meta tags, responsive pass (900 / 600 breakpoints), reduced-motion,
    keyboard nav, `prefers-color-scheme` left as light-only (match the app). Deploy.

---

## Non-goals (keep scope honest)

- No real backend, forms, analytics, or auth.
- No account / profile / history on the site (that's the app).
- No live ML — the widget demo is the same simulation as the app.
- Not a CMS — news/FAQ are hardcoded arrays.
- The 4 old apps are **not** rewritten or restyled; the site links to them as-is.

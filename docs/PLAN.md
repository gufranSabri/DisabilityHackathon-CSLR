# SignWorld App — Build Plan

> **STATUS (updated):** Pass 1 ✅ and Pass 2 ✅ both built. **Live Interpret was removed**
> per user request — Translate now has two modes (Sign→Text, Text→Sign). Theme reskinned
> to professional light. See `signworld-app/README.md` for the as-built feature list.
> Remaining future work: PLAN §F (interpreter profiles, reschedule, calendar month view),
> §G (medical-card PDF export), §I (skeleton loaders, Lighthouse pass).


A mobile-first **React PWA**: the Deaf citizen's one-stop-shop for Saudi Sign Language,
modeled on the **Absher** app pattern (bottom tab bar, dense services home, full catalog,
identity/profile) with a **raised middle tab = live camera for Sign → Text**.

Covers the "Ahmed" mobile-app spec from `disability_hackathon_services.pdf`:
Sign2Text, Text2Sign, Live Interpret Mode, Emergency SOS, Appointments & Interpreter
Booking, Document & Form Assistant, plus the SignWorld **Situational Directory** folded
in as the services catalog.

Everything is **hardcoded / simulated**, same as the `old/` apps:
- `CameraCapture` — real `getUserMedia` viewfinder, recognition faked on a timer.
- `AvatarStage` — SVG signing silhouette, toggles a "signing" animation.
- All transcripts / results / listings are canned bilingual (`{ ar, en }`) strings.
- No ML, no backend. `localStorage` for profile, saved services, bookings, history.
- Real & free browser APIs we *do* use: `speechSynthesis` (read aloud),
  `SpeechRecognition` where available (mic → text, else canned), `.ics` download
  (add to calendar), `getUserMedia` (camera viewfinder only).

---

## Locked decisions

| Question | Decision |
|---|---|
| Routing | **Tiny custom router** — `useState` `{ tab, stack: [...] }` per-tab, like `old/education`'s `screen` switch. No router dependency. |
| Camera realism | **Real viewfinder, fake recognition** — `getUserMedia` shows the live feed behind the scan overlay; transcript is a canned script on a timer. |
| Build scope | **Core first, then extras** (this file). Core = Pass 1. Extras = Pass 2. |
| Default language | **Arabic** (RTL), toggle to English. |

---

## Tech & structure (reuse from `old/`)

| Piece | Decision |
|---|---|
| Build | Vite + React 19 + `framer-motion` (same as `old/education`) |
| PWA | `vite-plugin-pwa` (`generateSW`) — installable, offline app shell, standalone, `theme_color #0b3d26`, maskable icons 192/512 |
| i18n | Port `old/education/src/useLang.js` verbatim — `{ ar, en }` content, RTL flip |
| Icons | Port `old` `Icons.jsx`, extend with ~15 glyphs (camera, sos, calendar, doc, mic, swap, chat, bell, user, home, grid, chevrons…) |
| Ornaments | Port `SaduField` / `Divider` (Saudi folk-textile texture) |
| Sign primitives | Port `CameraCapture.jsx` + `AvatarStage.jsx` from `old/education`, extend |
| State | Local `useState`; `src/useStore.js` wraps `localStorage` (profile, saved, bookings, history, chat) |
| Routing | Custom: `App.jsx` holds `{ tab, stacks: { home:[], services:[], ... } }`; push/pop screen descriptors per tab; hardware/back button pops the active stack |
| Styling | One `src/App.css` design system (CSS vars). Palette from `old/`: `--ink #0b3d26`, gold `--gold #e8b23f`, copper accent, off-white ground |
| Port | `vite.config.js` → port 5300 (matches `old/signworld-hub`) |
| Deploy | here.now (see `here.now` file in repo root) |

### File structure

```
signworld-app/
  index.html                 # fonts (Tajawal + Manrope), theme-color, viewport-fit=cover, PWA meta
  vite.config.js             # port 5300, react + PWA plugin
  public/
    favicon.svg
    icons/icon-192.png, icon-512.png, maskable-512.png
  src/
    main.jsx
    App.jsx                  # shell: tab state + per-tab stack router + SOS overlay mount
    content.js               # ALL hardcoded bilingual data (see Content model)
    useLang.js               # ported verbatim
    useStore.js              # localStorage: profile, saved, bookings, history, chat
    Icons.jsx                # ported + extended
    Ornaments.jsx            # ported
    components/
      TabBar.jsx             # 5 tabs, raised center FAB
      Header.jsx             # per-screen title / greeting, bell, lang toggle
      SosPill.jsx            # floating pill above tab bar
      SosFlow.jsx            # full-screen emergency overlay
      CameraCapture.jsx      # ported + real getUserMedia stream option
      AvatarStage.jsx        # ported + speed / formality / readAloud props
      ServiceCard.jsx
      Segmented.jsx  Chip.jsx  Sheet.jsx  Stepper.jsx  StatRibbon.jsx
    screens/
      Home.jsx
      Services.jsx  ServiceDetail.jsx
      Translate.jsx          # hosts Sign2Text / Text2Sign / LiveInterpret sub-views
      Bookings.jsx  NewBooking.jsx  BookingDetail.jsx  Interpreters.jsx
      Me.jsx  MedicalCard.jsx  Settings.jsx
      DocumentAssistant.jsx  History.jsx  Community.jsx  DeafChat.jsx   # (Pass 2)
    App.css
```

---

## Shell layout

```
┌─────────────────────────────┐
│  safe-area / status bar     │
│  Header: greeting|title · 🔔 · ع │
│                             │
│      SCROLLABLE SCREEN       │
│         CONTENT             │
│                             │
│              [ SOS ]  ← floating pill, above tab bar
├─────────────────────────────┤
│  Home  Services ╱📷╲ Bookings  Me │  ← 5 tabs, middle raised
└─────────────────────────────┘
```

- **5 bottom tabs:** Home · Services · **📷 Translate** (center, raised) · Bookings · Me
- **Floating SOS pill** on every screen except fullscreen camera / active SOS.
- Per-tab navigation stack; Header shows a back arrow when the stack is non-empty.

---

# PASS 1 — CORE

Goal: a demo-able app proving the architecture. Shell + the translation centerpiece +
the Absher-style surfaces + SOS.

### 1. Scaffold
- Vite + React + framer-motion + vite-plugin-pwa.
- Port `useLang.js`, `Icons.jsx` (+ extend), `Ornaments.jsx`.
- `App.css` base: CSS vars, palette, typography (Tajawal/Manrope), safe-area helpers,
  card / chip / button / segmented primitives.
- `index.html`: fonts, `theme-color`, `viewport-fit=cover`, apple PWA meta.

### 2. Shell — `App.jsx`
- Tab state + `stacks` object (one array per tab) + `push(tab, screen)` / `pop(tab)`.
- `TabBar` (5 tabs, raised center), `Header`, `SosPill` mounted globally.
- `AnimatePresence` screen transitions (reuse `fade` variant from `old/education`).

### 3. `content.js` skeleton
- Real bilingual copy for every Pass-1 screen. Structure per **Content model** below
  (Pass-1 keys: `CONTENT`, `SERVICES`, `SITUATIONS`, `INTERPRETERS`, `BOOKINGS_SEED`,
  `TRANSLATION_SCRIPTS`, `ANNOUNCEMENTS`, `PROFILE_DEFAULT`).

### 4. Translate tab (the centerpiece) — `Translate.jsx`
Mode switcher chips: **Sign → Text** · **Text → Sign** · **Live Interpret**.

- **Sign2Text** (default)
  - `CameraCapture` extended: real `getUserMedia` feed behind the scan overlay
    (graceful fallback to the SVG viewfinder if permission denied / no camera).
  - Big **Record** button → scan animation → **rolling transcript** builds line-by-line
    from `TRANSLATION_SCRIPTS.sign2text` (Arabic).
  - **Speak** button (`speechSynthesis`), **Copy** button.
  - Each finished transcript pushed to history (`useStore`).
  - Cosmetic: switch-camera, pause.
- **Text2Sign**
  - Text field (type / paste) + mic button (`SpeechRecognition` or canned) + phrasebook chips.
  - `AvatarStage` signs it. Controls: **speed** slider, **formality** toggle (رسمي / ودّي),
    **read aloud while signing** switch (drives `speechSynthesis`).
  - Avatar appearance picker (2–3, cosmetic).
- **Live Interpret**
  - Split screen; top half `rotate(180deg)` to face the other person.
  - Top (hearing): mic → captions + optional avatar signs.
  - Bottom (Deaf): camera → text + synthesized voice.
  - **Play demo conversation** button runs `TRANSLATION_SCRIPTS.liveInterpret` timeline;
    manual turn buttons too.

### 5. Home — `Home.jsx`
- Greeting header (name + avatar), bell (notif badge), lang toggle.
- Primary action cards: **Translate now** → Translate tab; **Live Interpret**.
- Quick-actions grid (2×3 Absher tiles): Sign2Text · Text2Sign · Live Interpret ·
  Emergency SOS · Book Interpreter · Scan Document *(Scan Document tile → Pass 2 stub
  screen "coming soon" in Pass 1, or route to Me)*.
- "Your day" strip: last translation, next appointment, a pinned service.
- Situational shortcuts: horizontal scroll of life-moments → Services tab (deep link).
- Announcements: signed-broadcast card → opens `AvatarStage` playing a canned message.
- Stat ribbon: "1,200+ classrooms · 40+ ER kiosks · 24/7".

### 6. Services — `Services.jsx` + `ServiceDetail.jsx`
- Segmented control: **By life moment** (default) / **All services**.
- **By life moment:** `SITUATIONS` (ported from `old/signworld-hub` + add `hajj`,
  `employment`). Each expands to service/resource cards.
- **All services:** flat catalog + search bar. Categories: government (Absher, Tawakkalna,
  Seha, Najiz/courts), health, education, community, interpreting. Card badge:
  `App` / `Gov service` / `Community resource`.
- CTA behavior: app tools → in-app screen; gov/partner → **ServiceDetail** (hero, signed
  explainer via `AvatarStage`, "how SignWorld helps here", steps, related tools,
  "Book an interpreter for this", mock "Open in Absher").
- **Pin / save** (port `usePins` idea into `useStore`) — saved surface on Home + "Saved" filter.

### 7. Bookings — `Bookings.jsx` + `NewBooking.jsx` + `BookingDetail.jsx` + `Interpreters.jsx`
- **Upcoming / Past** segmented. Cards: date/time, type (court / hospital / job interview /
  gov office), interpreter (name + initial), location, status chip. Seeded from
  `BOOKINGS_SEED` (2 upcoming + 2 past), merged with `localStorage` additions.
- **BookingDetail:** add-to-calendar (real `.ics` download), message interpreter
  (→ DeafChat stub in Pass 1), cancel / reschedule.
- **NewBooking** (stepper, pushed on stack):
  1. Situation type  2. On-site vs. VRS  3. Date & time (grid picker)
  4. Language pair (SSL↔Arabic; SSL↔ASL/International for Hajj)  5. Notes + confirm
  → success screen; new card persisted, appears in Upcoming.
- **Interpreters:** directory from `INTERPRETERS` (name, specialties, rating, languages),
  "request this interpreter" → NewBooking prefilled.

### 8. Me — `Me.jsx` + `MedicalCard.jsx` + `Settings.jsx`
- **Identity card:** name, masked ID, photo, preferred comm mode (SSL / text / voice-off),
  emblem. "This is what a first responder sees."
- **Medical & SOS profile** (`MedicalCard`, editable + persisted): conditions, meds,
  allergies, emergency contacts, blood type, preferred hospital.
- **Emergency SOS settings:** number (911 / 937), auto-share location toggle,
  auto-attach medical card toggle, ICE contacts.
- Menu rows → History, Community, Deaf Chat, Document Assistant *(Pass 2 — show as rows
  that route to a "coming soon" stub in Pass 1)*.
- **Settings:** language, text size, high-contrast, captions-default, avatar defaults,
  notifications, about (Vision 2030 / SDAIA conceptual alignment).

### 9. Emergency SOS overlay — `SosFlow.jsx`
Triggered by `SosPill` from any screen. Full-screen, red, minimal:
1. **3-2-1 countdown** + big cancel.
2. **Connecting…** → "Connected to 937".
3. **Active:** split view — dispatcher captions top; your camera + signing→text bottom;
   location / medical card / comm mode shown as "already shared" chips; canned dispatcher
   script ("Help is on the way, ETA 6 min").
4. Big **End** → summary saved to History.

### 10. PWA basics
- `manifest.webmanifest`, icons, `generateSW` precache of the app shell (opens offline),
  runtime-cache Google Fonts.
- `apple-mobile-web-app-capable`, safe-area insets on Header + TabBar.
- Simple brand splash on first paint.

**End of Pass 1:** deploy to here.now.

---

# PASS 2 — EXTRAS

Depth on the surfaces stubbed in Pass 1, plus polish.

### A. Document & Form Assistant — `DocumentAssistant.jsx`
- Entry from Home quick-action + Me menu row.
- "Scan a form" → `CameraCapture` still-capture → mock OCR result (canned form: e.g. a
  government service request).
- **Explained in signed video:** `AvatarStage` + a plain-language step list of what the
  form asks and why.
- **Guided fill** wizard: field-by-field, each with a signed prompt (`AvatarStage`) +
  input; progress bar.
- Finish → mock "submit" / "save as PDF" (real print-to-PDF or `.txt` download).
- Scanned docs saved to History.

### B. Deaf Chat — `DeafChat.jsx`
- Mock 1:1 + group chat UI: text bubbles, "video message" bubbles (thumbnail + play →
  `AvatarStage` canned clip), typing indicator, canned replies on a timer.
- Seeded from `CHAT_SEED`. Reachable from Me → Community and from "message interpreter".
- Covers Dr Sarah "Community" + Dr Hamzah "Deaf Chat".

### C. Community — `Community.jsx`
- Curated link list: Saudi Deaf Association, VRS / Video Relay Service, forums,
  Saudi SL Community, learning resources.
- Each: icon, name, one-line, "open" (external, mock) + "explain in sign" (`AvatarStage`).
- A small "Forum" preview: canned threads (title, author, replies count) → thread view
  with canned posts.

### D. Situational Directory depth
- Add **Employment** and **Hajj & Umrah** life-moments end-to-end (services, detail pages,
  signed explainers).
- Hajj: highlight **SSL ↔ ASL / International Sign** translation in Translate +
  a dedicated "Hajj facilitator" service detail.
- "Saved" tab in Services with reorder.

### E. Home depth
- Live "signed broadcast" feed with multiple `ANNOUNCEMENTS` (MOH, weather, national).
- Personalized "because you're near King Fahd Hospital" style contextual cards (mock).
- Onboarding: first-run 3-slide intro (in sign + text), set name + comm mode.

### F. Bookings depth
- Reschedule flow (reuse NewBooking stepper).
- Interpreter profile pages (bio, sample signed intro clip, reviews).
- Calendar month view of upcoming bookings.

### G. Me depth
- Real `beforeinstallprompt` capture → "Add to Home Screen" card in Settings.
- History filters (translations / interpret sessions / SOS / documents) + detail views,
  replay a past Sign2Text transcript with `AvatarStage`.
- Export medical card as a shareable card / PDF.
- High-contrast + large-text themes actually wired through `App.css` tokens.

### H. Live Interpret / SOS depth
- Live Interpret: language-pair picker, save transcript, "hand the phone over" prompt
  animation between turns.
- SOS: notify-ICE-contacts mock (shows "SMS sent to 2 contacts"), post-call summary with
  map snapshot (static image), "what to do while you wait" signed guidance.

### I. Polish
- Micro-interactions, skeleton loaders, empty states, haptics (`navigator.vibrate`).
- Full RTL/LTR audit. Reduced-motion support.
- Icon set cleanup, favicon + maskable icon art.
- Lighthouse PWA pass (installable, offline, a11y ≥ 95).

---

## Content model — `src/content.js` (all hardcoded, bilingual `{ ar, en }`)

| Export | Pass | Shape |
|---|---|---|
| `CONTENT` | 1 | All UI strings, keyed by screen |
| `SERVICES` | 1 | `{ id, kind: 'app'|'gov'|'resource', icon, accent, name, tagline, body, category, situations: [], cta }` |
| `SITUATIONS` | 1 | Life-moment groups → service ids. Ported from `old/signworld-hub/content.js` + add `hajj`, `employment` |
| `INTERPRETERS` | 1 | `{ id, name, initial, rating, specialties: [], languages: [] }` |
| `BOOKINGS_SEED` | 1 | 2 upcoming + 2 past `{ id, dt, type, interpreterId, location, mode, status }` |
| `TRANSLATION_SCRIPTS` | 1 | `{ sign2text: [lines], phrasebook: [{ar,en}], liveInterpret: [{who, text}], dispatcher: [lines] }` |
| `ANNOUNCEMENTS` | 1 | `{ id, source, title, body, signedClipId }` |
| `PROFILE_DEFAULT` | 1 | `{ name, idMasked, commMode, medical: {...}, sos: {...} }` |
| `CHAT_SEED` | 2 | `{ threads: [{ id, name, messages: [{ from, kind: 'text'|'video', text, clipId }] }] }` |
| `COMMUNITY_LINKS` | 2 | `{ id, name, url, blurb, signedClipId }` + `FORUM_SEED` |
| `DOC_FORMS` | 2 | Canned form definitions `{ id, title, fields: [{ label, type, signedPrompt }], explainer: [steps] }` |

---

## Notes / conventions

- Follow `old/` code style: functional components, one `App.css`, `motion` variants
  declared at module top, `Icon` name-keyed SVG map, bilingual via `t.<screen>.<key>`.
- Keep components presentational; data comes from `content.js` or `useStore`.
- Simulated async: `setTimeout` for "recognition", "connecting", "interpreter replying".
- Nothing claims a real partnership it doesn't have — gov services are clearly framed as
  "conceptual integration" (same posture as `old/signworld-hub`).

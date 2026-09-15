# SignWorld App

A mobile-first **React PWA** — the Deaf citizen's one-stop shop for Saudi Sign Language.
Absher-style shell: bottom tab bar, dense services home, full catalog, identity/profile,
with a **raised middle tab = live camera for Sign → Text**.

Covers the "Ahmed" mobile-app spec from `../disability_hackathon_services.pdf`:
Sign2Text · Text2Sign · Emergency SOS · Interpreter Booking · Document & Form Assistant,
plus the SignWorld Situational Directory as the services catalog, and a Deaf community layer.

Everything is **hardcoded / simulated** — no ML, no backend. See `../PLAN.md` for the full
Pass 1 / Pass 2 breakdown. **Pass 1 + Pass 2 are both complete.** (Live Interpret was cut.)

**Theme:** professional light — white surfaces, hairline borders, soft shadows, a Saudi-green
(`#0b7a4b`) primary with muted per-category accents. The Emergency SOS overlay stays a solid
red so it's unmistakable. All colors are CSS custom properties at the top of `src/App.css`.

## Run

```bash
npm install
npm run dev      # http://localhost:5300
npm run build    # production build + service worker
npm run preview  # serve the build
```

## What's real vs. simulated

| Real (free browser APIs) | Simulated |
|---|---|
| Camera viewfinder (`getUserMedia`) | Sign recognition — canned transcript on a timer |
| `speechSynthesis` (read aloud / speak transcript) | Avatar signing — SVG silhouette animation |
| `SpeechRecognition` for dictation (where supported; canned fallback) | Emergency dispatch, form OCR — scripted |
| `.ics` calendar download, `.txt` form export | All service / interpreter / booking / chat / forum data |
| `localStorage` (profile, saved, bookings, history, settings) | Interpreter replies, chat replies — `setTimeout` |
| Installable PWA (`beforeinstallprompt`), offline app shell | — |
| a11y: text-size / high-contrast / reduce-motion (real CSS tokens) | — |

## Structure

```
src/
  App.jsx            # shell: custom {tab, stacks[]} router + SOS overlay + first-run Onboarding
  content.js         # ALL hardcoded bilingual (ar/en) data
  useLang.js         # bilingual + RTL, default Arabic, persisted
  useStore.js        # localStorage slices: profile / saved / bookings / history / settings
  Icons.jsx  Ornaments.jsx
  components/
    TabBar  Header  SosPill  SosFlow
    CameraCapture  AvatarStage           # ported from ../old/education, extended
    ServiceCard  Segmented
  screens/
    Onboarding                            # first-run 3 slides + name / comm-mode setup
    Home  Services (+ situation / detail)
    Translate (Sign2Text / Text2Sign)
    Bookings (+ new-booking wizard / detail / interpreter directory)
    Me (+ MedicalCard / Settings)
    DocumentAssistant  DeafChat  Community  History
```

## Tabs

1. **Home** — dashboard: two translate CTAs, quick-actions grid, "your day", situational
   shortcuts, 3 signed announcements, stat ribbon.
2. **Services** — *By moment* (7 life-situations incl. Hajj + Employment) / *All services*
   (searchable, category-grouped, save/pin). Gov services open a "how SignWorld helps here"
   detail with a signed explainer + steps.
3. **📷 Translate** (raised) — Sign→Text (real camera + rolling canned transcript, speak,
   copy) · Text→Sign (avatar + speed / formality / read-aloud / phrasebook).
4. **Bookings** — upcoming / past, 5-step new-booking wizard, booking detail with `.ics`
   export + "message interpreter" → Deaf Chat, interpreter directory.
5. **Me** — identity card, editable medical & SOS profile, SOS settings, menu →
   **History · Community · Deaf Chat · Form Assistant · Settings**.

**Emergency SOS** — floating pill (hidden on Translate + chat screens) → full-screen red
overlay: countdown → connecting → active split view (dispatcher captions, your camera→text,
pre-attached location / medical / comm-mode, "SMS sent to 2 contacts", signed "what to do
while you wait" guidance) → summary saved to History.

## Pass 2 features

- **Onboarding** — first run only: 3 signed intro slides + set name & preferred comm mode.
- **Document & Form Assistant** — pick a form → camera scan → mock OCR → signed explainer
  (`AvatarStage` + step list) → field-by-field guided fill with a signed prompt per field →
  review → submit (saved to History) / `.txt` download.
- **Deaf Chat** — thread list (1:1 + group), conversation view with text bubbles, signed
  "video message" bubbles (tap → `AvatarStage` clip), typing indicator, canned replies.
- **Community** — curated links with "explain in sign" sheets + a Forum (threads → posts →
  post a reply).
- **History** — filterable activity log (all / Sign→Text / Text→Sign / SOS / documents);
  replay a past Sign→Text or Text→Sign entry in the avatar.
- **Settings depth** — text-size (sm/md/lg), high-contrast, reduce-motion — all wired
  through `:root[data-*]` CSS tokens; `beforeinstallprompt` → "Add to Home Screen" card.
- **SOS depth** — ICE-contact SMS confirmation + signed wait-guidance.

## Still simplified

Interpreter profile pages, booking reschedule flow, calendar month view, medical-card
PDF export, and full skeleton-loader polish are left as future work (PLAN.md §F, §I).

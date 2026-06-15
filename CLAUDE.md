# Project Context for Claude Code

## Who is the user
- **Name:** Philipp Gebhardt (Phil)
- **Email:** phil.gebhardt@gmail.com / phil.gebhardt@proton.me
- **Phone:** +49 177 4333 272
- **Location:** Nuremberg, Germany (open to Berlin or remote)
- **Professional:** Marketing Manager, 10+ years — EA SPORTS FIFA gaming events (cip) -> trade shows (Kastinger) -> adidas (Digital Experience -> Digital Activation -> CRM/Membership -> Global Senior Manager Retail Marketing & Brand Experiences) -> Freelance indie game marketing (Distant Meadows / "Waters of Sal Namena") -> applying to ByteRockers' Games Berlin
- **Certified Game Designer** (WBA, 2026)
- **Languages:** German (native), English (fluent C1)
- **Interests:** Family, Hockey, Punk Rock, Hiking, Reading
- **LinkedIn:** https://www.linkedin.com/in/philipp-gebhardt
- **Classic CV site:** https://philgebhardtcv.netlify.app
- **CV PDF:** https://philgebhardtcv.netlify.app/docs/CV_Philipp_Gebhardt_2026.pdf

## Communication preferences
- Phil communicates in German but the CV/game content is in English
- Prefers concise, punchy copy — not corporate speak
- Likes ironic/self-aware humor
- Writes his own cover letter text — prefers to take a draft and rewrite it himself

## Interactive CV Game ("Press Start CV")

### Overview
A 2D platformer-style interactive CV website built as a job application for the Marketing Manager role at ByteRockers' Games (Berlin indie studio). The game IS the application — "no formal application needed, just say hi."

### Location & Deployment
- **Path:** `press-start-cv/` subdirectory (standalone, isolated from parent repo)
- **Branch:** `claude/interactive-cv-game-el18t6`
- **Draft PR:** #2 on makerphil10/retailnxtlvl
- **Deployment:** Netlify (ZIP delivered for manual upload, site at philgebhardtcv.netlify.app)

### Tech Stack
- React 18 + TypeScript + Vite 7 (NO Tailwind)
- CSS-only pixel art sprites via `box-shadow` technique
- WebAudio API for chiptune SFX and procedural punk-flavored background music (~136 BPM)
- 2D platformer physics: gravity, jumping, one-way platforms, side collision
- Parallax scrolling (stars, far/near buildings)
- localStorage persistence (key: `press-start-cv-progress-v1`)
- Touch controls for mobile

### Key Files
- `press-start-cv/src/cvData.ts` — All CV content: PLAYER, TARGET, STATIONS (8 career stops), ACHIEVEMENTS (13), SKILLS, INVENTORY
- `press-start-cv/src/audio.ts` — WebAudio SFX + punk background music loop
- `press-start-cv/src/sprites.ts` — Pixel art character (SCALE=6, 72x96px)
- `press-start-cv/src/components/GameWorld.tsx` — Core platformer engine
- `press-start-cv/src/App.tsx` — Main state management (StrictMode-safe refs)
- `press-start-cv/src/components/TitleScreen.tsx` — Start/Continue/New Game/Classic CV/PDF
- `press-start-cv/src/components/Hud.tsx` — XP bar with flash animation, PDF shortcut, toggles
- `press-start-cv/src/components/StationModal.tsx` — Career station modal (E key opens AND closes)
- `press-start-cv/src/components/Pages.tsx` — Character sheet, Achievements, Contact, Classic CV
- `press-start-cv/src/styles.css` — CRT scanlines, pixel buildings, moon, terraces, crates, animations

### Design Decisions
- Music is quiet/subtle, punk-rock flavored
- PDF shortcut prominently visible in HUD for recruiters who don't want to play
- E key both opens AND closes modals (Phil insisted on this for UX consistency)
- Ironic meta-achievements: "Baby Steps" for first move, "Market Research" for walking left into wall
- New Game button resets localStorage progress
- Final station (ByteRockers) has loot text: "NO FORMAL APPLICATION NEEDED — JUST SAY HI"

### Known Technical Fixes
- **PostCSS/Tailwind conflict:** Parent repo's `postcss.config.js` interferes. Fixed with `css: { postcss: { plugins: [] } }` in `press-start-cv/vite.config.ts`
- **StrictMode double-firing:** Achievement unlock uses refs (`unlockedRef`, `visitedRef`) outside state updaters
- **Player boundary:** `maxX = lastStationX + 70` prevents walking past final gate
- **Vite base path:** `base: './'` for portable Netlify deployment

## Application Context
- **Target:** ByteRockers' Games, Berlin — Marketing Manager (indie studio, two games, full lifecycle)
- **Key requirement:** "Games Industrie Erfahrung" (games industry experience)
- **Phil's games angle:** cip/EA SPORTS FIFA -> adidas gaming/digital -> indie game marketing (Distant Meadows) -> ByteRockers
- **Salary expectation:** ~62,000 EUR brutto/Jahr (realistic range 55-70k for Berlin indie game marketing manager)
- Cover letter was collaboratively drafted, Phil rewrote the final version himself

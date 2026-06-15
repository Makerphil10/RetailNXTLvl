# Phil Gebhardt: Press Start — An Interactive CV

A playable CV website built like a retro indie game, created for the
**Marketing Manager** application at **ByteRockers' Games**.

Walk a pixel character through a marketing career — from EA SPORTS FIFA
gaming events through global adidas rollouts to indie game launches on
Steam. Each career station is a checkpoint that opens a quest log and unlocks
Steam-style achievements. A "Classic CV" mode is included for recruiters in a
hurry.

> This app is fully standalone: it has its own `package.json` and build and
> shares no code with the rest of this repository. You can move this folder
> into its own repo as-is.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

The static site lands in `dist/` and can be deployed anywhere
(Netlify, Vercel, GitHub Pages — `base: './'` is already configured).

## Edit the content

All CV content (career stations, skills, achievements, contact info) lives in
a single file: [`src/cvData.ts`](src/cvData.ts).

## Controls

| Input | Action |
| --- | --- |
| ← → or A/D | Walk |
| E / Enter / Space | Inspect a career station |
| Esc | Close dialogs |
| Touch | On-screen ◀ ▶ Ⓐ buttons |

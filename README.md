# Portfolio · egeyesilyurt.ca

Personal portfolio site. Single-page, cyberpunk-styled (volt yellow on matte black), fully static.

**Stack:** SvelteKit (Svelte 5) · TypeScript · Tailwind CSS v4 · GSAP · Vercel

## Structure

```
src/
├── lib/
│   ├── actions/reveal.ts      # GSAP scroll-entrance animation (Svelte action)
│   ├── components/            # Header, Hero, Entrance, FeaturedProject, ProjectCard,
│   │                          # PhotoCycler, VoxelFrame, Skills, MusicWidget, Contact
│   ├── data/site.ts           # All page content: projects, skills, contact links
│   ├── state/                 # Shared runes state (entrance completion)
│   └── voxel/scene.ts         # Geometry for the voxel diorama in the hero photo frame
└── routes/
    ├── +page.svelte           # Single page composing every section
    ├── +layout.svelte         # Fonts + global CSS
    └── layout.css             # Tailwind theme tokens (palette, fonts) + utilities
static/                        # Photos, project screenshots, logo, resume, OG image
```

All copy lives in `src/lib/data/site.ts`; edit projects/skills there, never in components.

## Development

```sh
npm install
npm run dev        # dev server
npm run check      # svelte-check (types)
npm run lint       # prettier + eslint
npm test           # vitest: site data integrity + voxel scene bounds
npm run build      # production build (prerendered, adapter-vercel)
```

## Logo & entrance

The graffiti logo is `static/logo.png` — a transparent PNG keyed from the
original artwork, so it drops onto any background without a blend mode.

`Entrance.svelte` is the spray-paint entrance overlay: a spray can paints the
logo onto a dark window, then the window slides up. It plays on every page
load, is skippable with click/Escape/Enter/Space, and is skipped entirely under
`prefers-reduced-motion`. The hero intro waits on `$lib/state/entrance.svelte.ts`.

## Hero photo frame

The rotating hero photos sit inside a voxel diorama — plank frame, terrain,
trees, a pond and a torch — generated in `src/lib/voxel/scene.ts` and rendered
as a single SVG. Geometry is seeded (no `Math.random`) so server and client
render identical markup, and the whole scene is clipped to the photo so nothing
spills outside the frame. Tests assert those bounds.

## Deploying

Pushed to Vercel via GitHub integration; `main` deploys to production, branches
get preview URLs. No environment variables needed.

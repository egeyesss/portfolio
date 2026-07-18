# Portfolio — egeyesilyurt

Personal portfolio site. Single-page, cyberpunk-styled (volt yellow on matte black), fully static.

**Stack:** SvelteKit (Svelte 5) · TypeScript · Tailwind CSS v4 · GSAP · Vercel

## Structure

```
src/
├── lib/
│   ├── actions/reveal.ts      # GSAP ScrollTrigger entrance animation (Svelte action)
│   ├── components/            # Header, Hero, FeaturedProject, ProjectCard, Skills, Contact
│   └── data/site.ts           # All page content — projects, skills, contact links
└── routes/
    ├── +page.svelte           # Single page composing every section
    ├── +layout.svelte         # Fonts + global CSS
    └── layout.css             # Tailwind theme tokens (palette, fonts) + cyberpunk utilities
```

All copy lives in `src/lib/data/site.ts` — edit projects/skills there, never in components.

## Development

```sh
npm install
npm run dev        # dev server
npm run check      # svelte-check (types)
npm run lint       # prettier + eslint
npm test           # vitest — validates site data integrity
npm run build      # production build (prerendered, adapter-vercel)
```

## Logo & entrance

The graffiti logo lives at `static/logo.jpg` (black background — rendered with
`mix-blend-mode: screen` so the black drops out on dark surfaces).

`Entrance.svelte` is the spray-paint entrance overlay: a spray can paints the logo onto a dark window, then the
window slides up. It plays on every page load, is skippable with
click/Escape/Enter/Space, and is skipped entirely under
`prefers-reduced-motion`. The hero intro waits on `$lib/state/entrance.svelte.ts`.

## Deploying

Pushed to Vercel via GitHub integration — `main` deploys to production,
branches get preview URLs. No environment variables needed.

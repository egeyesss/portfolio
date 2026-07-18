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

## Logo

The header renders a text wordmark until a graffiti logo file exists at
`static/logo.png` — drop the file in and it swaps automatically.

## Deploying

Pushed to Vercel via GitHub integration — `main` deploys to production,
branches get preview URLs. No environment variables needed.

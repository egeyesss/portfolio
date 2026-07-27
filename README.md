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

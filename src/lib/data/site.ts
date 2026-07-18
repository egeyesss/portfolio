export interface ProjectLink {
	label: string;
	href: string;
}

export interface Project {
	name: string;
	tagline: string;
	highlights: string[];
	tech: string[];
	links: ProjectLink[];
	year: string;
}

/**
 * z9bra and its puzzle engine are presented as one paired story:
 * the shipped game, and the open-source solver that powers it.
 */
export const featured: Project[] = [
	{
		name: 'z9bra',
		tagline: 'Daily logic-puzzle game — live at zebra9.xyz',
		highlights: [
			'Wordle-style daily puzzle that scaled to 500+ unique players, with deterministic date-seeded selection so everyone gets the same grid.',
			'Commit-based solving engine (no undo, overwrite-count scoring) and server-rendered share cards via Satori.',
			'Optional account sync for cross-device streaks with a localStorage fallback; automated preview + production deploys on Vercel.'
		],
		tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Satori', 'Vitest', 'Vercel'],
		links: [
			{ label: 'Play it', href: 'https://zebra9.xyz' },
			{ label: 'Source', href: 'https://github.com/egeyesss/zebra' }
		],
		year: '2026'
	},
	{
		name: 'Puzzle Generator',
		tagline: 'The constraint-solver engine behind z9bra',
		highlights: [
			'Research-grade Python engine using Google OR-Tools CP-SAT as a uniqueness oracle — every exported puzzle is provably single-solution.',
			'Custom propagation tracer measures human deduction depth and branching factor to score and tune difficulty.',
			'7-type clue system cross-checked between the CP-SAT translation and an independent pure-Python implementation; strict TDD, property-based tests, mypy-strict clean.'
		],
		tech: ['Python 3.12', 'OR-Tools CP-SAT', 'Pydantic v2', 'pytest', 'Hypothesis', 'mypy'],
		links: [{ label: 'Source', href: 'https://github.com/egeyesss/csp-generator' }],
		year: '2026'
	}
];

export const projects: Project[] = [
	{
		name: 'FITIVA',
		tagline: 'Workout training planner web app',
		highlights: [
			'Led a 6-person team as project lead, managing sprints and delegation through Jira.',
			'Full-stack planner: user/trainer auth, fitness profiles, program scheduling, and workout recommendations.',
			'Repository-pattern data layer with a stub/real DB swap for fast isolated tests; 40+ Django unit tests, fully containerized.'
		],
		tech: ['Next.js', 'TypeScript', 'Django REST', 'MySQL', 'Docker'],
		links: [{ label: 'Source', href: 'https://github.com/egeyesss/group2-fitiva' }],
		year: '2026'
	},
	{
		name: 'BundesPredict',
		tagline: 'Bundesliga match predictor — live',
		highlights: [
			'Dixon–Coles match model with weekly automated retraining via GitHub Actions, serving calibrated win/draw/loss probabilities.',
			'LLM adjustment layer that only emits bounded, schema-validated tweaks — the deterministic engine owns every number.',
			'FastAPI + Postgres backend, Next.js frontend; market-value priors scraped from Transfermarkt.'
		],
		tech: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Docker', 'GitHub Actions'],
		links: [
			{ label: 'Live', href: 'https://bundespredict.vercel.app' },
			{ label: 'Source', href: 'https://github.com/egeyesss/BundesPredict' }
		],
		year: '2026'
	},
	{
		name: 'Spocity',
		tagline: 'Your Spotify history as a 3D voxel city — live',
		highlights: [
			'Spotify OAuth with on-demand listening-history ingest through Django + Celery background jobs.',
			'Genre rollup turns your top artists into city districts, rendered as a voxel dusk city in React Three Fiber.',
			'Public shareable profile pages and a postcard generator; deployed on Vercel + Railway.'
		],
		tech: ['Next.js', 'React Three Fiber', 'TypeScript', 'Django', 'Celery', 'PostgreSQL'],
		links: [
			{ label: 'Live', href: 'https://spocity-smoky.vercel.app' },
			{ label: 'Source', href: 'https://github.com/egeyesss/spocity' }
		],
		year: '2026'
	}
];

export const skillGroups: { label: string; items: string[] }[] = [
	{
		label: 'Languages',
		items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'HTML/CSS', 'MATLAB']
	},
	{
		label: 'Frameworks & Libraries',
		items: [
			'Next.js',
			'React',
			'SvelteKit',
			'Django REST Framework',
			'Tailwind CSS',
			'GSAP',
			'React Three Fiber',
			'Celery'
		]
	},
	{
		label: 'Infrastructure & Tools',
		items: [
			'Docker',
			'Kubernetes',
			'PostgreSQL',
			'MySQL',
			'Redis',
			'Git',
			'REST APIs',
			'OAuth 2.0',
			'Vercel',
			'Jira'
		]
	}
];

export const hobbies: { emoji: string; label: string }[] = [
	{ emoji: '🌍', label: 'Traveling' },
	{ emoji: '🎒', label: 'Backpacking' },
	{ emoji: '⚽', label: 'Soccer' },
	{ emoji: '🏸', label: 'Badminton' },
	{ emoji: '🧗', label: 'Rock climbing' },
	{ emoji: '🥾', label: 'Hiking' },
	{ emoji: '🎮', label: 'Gaming with friends' }
];

// Cycled in the hero photo frame, in order
export const heroPhotos = [
	'/photos/ege-1.jpg',
	'/photos/ege-2.jpg',
	'/photos/ege-3.jpg',
	'/photos/ege-4.jpg',
	'/photos/ege-5.jpg',
	'/photos/ege-6.jpg'
];

export const contact = {
	email: 'egeyesilyurtca@gmail.com',
	github: 'https://github.com/egeyesss',
	linkedin: 'https://linkedin.com/in/egeyesss'
};

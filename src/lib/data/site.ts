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
			'Wordle-style daily puzzle with 500+ unique players — everyone gets the same date-seeded grid.',
			'Commit-based solving engine with overwrite scoring and server-rendered share cards.',
			'Optional account sync for cross-device streaks; automated deploys on Vercel.'
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
			'Python engine using OR-Tools CP-SAT as a uniqueness oracle — every puzzle is provably single-solution.',
			'Custom propagation tracer measures human deduction depth to score and tune difficulty.',
			'Built with strict TDD: property-based tests, dual-implementation cross-checks, mypy-strict clean.'
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
			'Led a 6-person team as project lead — sprint planning and delegation in Jira.',
			'User/trainer auth, fitness profiles, program scheduling, and workout recommendations.',
			'Repository-pattern data layer, 40+ Django unit tests, fully containerized.'
		],
		tech: ['Next.js', 'TypeScript', 'Django REST', 'MySQL', 'Docker'],
		links: [{ label: 'Source', href: 'https://github.com/egeyesss/group2-fitiva' }],
		year: '2026'
	},
	{
		name: 'BundesPredict',
		tagline: 'Bundesliga match predictor — live',
		highlights: [
			'Dixon–Coles match model, retrained weekly via GitHub Actions.',
			'LLM layer emits only bounded, validated adjustments — the engine owns every number.',
			'FastAPI + Postgres backend, Next.js frontend, Transfermarkt market-value priors.'
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
			'Spotify OAuth with on-demand history ingest via Django + Celery jobs.',
			'Genre rollup turns your artists into districts of a 3D voxel city in React Three Fiber.',
			'Shareable public profiles and a postcard generator; deployed on Vercel + Railway.'
		],
		tech: ['Next.js', 'React Three Fiber', 'TypeScript', 'Django', 'Celery', 'PostgreSQL'],
		links: [
			{ label: 'Live', href: 'https://spocity-smoky.vercel.app' },
			{ label: 'Source', href: 'https://github.com/egeyesss/spocity' }
		],
		year: '2026'
	}
];

// Deliberately short — every item here shows up in the projects above.
// A recruiter should see a specialist, not a checklist of everything ever touched.
export const skillGroups: { label: string; items: string[] }[] = [
	{
		label: 'Languages',
		items: ['TypeScript', 'Python', 'Java', 'SQL']
	},
	{
		label: 'Frameworks & Libraries',
		items: ['Next.js', 'React', 'SvelteKit', 'Django REST Framework', 'FastAPI', 'Tailwind CSS']
	},
	{
		label: 'Infrastructure & Tools',
		items: ['PostgreSQL', 'MySQL', 'Docker', 'GitHub Actions', 'Vercel', 'Git']
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

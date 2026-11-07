export interface ProjectLink {
	label: string;
	href: string;
}

export interface Project {
	name: string;
	tagline: string;
	/** One crisp decision-and-why line, the highest-signal thing a reviewer reads. */
	ownership?: string;
	highlights: string[];
	tech: string[];
	links: ProjectLink[];
	year: string;
	image?: string;
	imageAlt?: string;
	/** Looping demo clip. Renders in place of `image`, which becomes its poster. */
	video?: string;
}

/**
 * Full-width card above the featured pair: the only project with paying
 * users, and the biggest one by scope (52 PRs, auth, billing, ops).
 */
export const lead: Project = {
	name: 'BundesPredict',
	tagline: 'Bundesliga prediction site with paying subscribers',
	ownership:
		'Kept the Dixon–Coles model as the only thing that produces a probability. The LLM agent can only ask for an expected-goals change, and the server clamps each one to ±0.6.',
	highlights: [
		'Free and $5/month Pro plans on Stripe Checkout, with the plan read only from signed webhooks so a returning browser can never grant Pro on its own.',
		'Hand-written Dixon–Coles model within 4% of closing bookmaker odds over 1,827 walk-forward backtested matches, refit daily by GitHub Actions.',
		'Chat agent on the Anthropic API that streams each tool call over SSE while it checks your news against squad data and the weather forecast.',
		'Google and email-code sign-in, daily chat quotas, a public track record scored after every match, a weekly matchday email, and an admin dashboard for MRR, churn and AI cost per subscriber.'
	],
	tech: [
		'Python',
		'Django REST Framework',
		'Next.js',
		'TypeScript',
		'PostgreSQL',
		'Stripe',
		'Anthropic API',
		'GitHub Actions'
	],
	links: [
		{ label: 'Live', href: 'https://bundespredict.egeyesilyurt.ca' },
		{ label: 'Source', href: 'https://github.com/egeyesss/BundesPredict' }
	],
	year: '2026',
	image: '/projects/bundespredict.jpg',
	imageAlt: 'BundesPredict matchday page with win, draw and loss odds for all nine fixtures'
};

/**
 * The pair under the lead card: the one with outside contributors, and the
 * one with the most players.
 */
export const featured: Project[] = [
	{
		name: 'OverTerm',
		tagline: 'Agent-aware floating terminal for macOS',
		ownership:
			'Determined agent state from a vt100 screen model of the pseudoterminal instead of the raw byte stream, so it works with any CLI tool rather than one parser per agent.',
		highlights: [
			'Native Rust + Tauri v2 terminal that shrinks to a status bar while an AI coding agent works and expands when it needs you.',
			'Reads exact turn events out of Claude Code hooks as OSC markers, with all agent-state logic in a Rust core built through TDD.',
			'One-command install behind a tag-triggered GitHub Actions pipeline that verifies every artifact and auto-bumps the Homebrew cask.'
		],
		tech: ['Rust', 'Tauri v2', 'TypeScript', 'xterm.js', 'vt100', 'objc2', 'GitHub Actions'],
		links: [{ label: 'Source', href: 'https://github.com/egeyesss/overterm' }],
		year: '2026',
		image: '/projects/overterm.jpg',
		imageAlt: 'OverTerm floating above a full-screen video with a finished Claude Code answer',
		video: '/projects/overterm-demo.mp4'
	},
	{
		name: 'z9bra',
		tagline: 'Daily logic-puzzle game, live at zebra9.xyz',
		ownership:
			'It runs on a commit-based solver that scores the guesses you lock in as you go, so the game rewards real reasoning over a lucky final grid.',
		highlights: [
			'Wordle-style daily puzzle with 200+ unique players, all solving the same date-seeded grid.',
			'Commit-based solving engine with overwrite scoring and server-rendered share cards.',
			'Optional account sync for cross-device streaks; automated deploys on Vercel.'
		],
		tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Satori', 'Vitest', 'Vercel'],
		links: [
			{ label: 'Play it', href: 'https://zebra9.xyz' },
			{ label: 'Source', href: 'https://github.com/egeyesss/zebra' }
		],
		year: '2026',
		image: '/projects/z9bra.jpg',
		imageAlt: 'z9bra landing page with the daily logic grid'
	}
];

/**
 * The looping rail under the featured pair. Needs at least three entries: the
 * rail scrolls one offset across repeated copies of this list, and a copy has
 * to be wider than the viewport for a step to stay on track between wraps.
 */
export const projects: Project[] = [
	{
		name: 'Deximon',
		tagline: 'Pokémon TCG collector platform, 6-person team',
		ownership:
			'Reviewed 8 teammate pull requests with written scores and follow-up fixes, catching a WebSocket handler that crashed on dead sockets and an N+1 query on the marketplace feed.',
		highlights: [
			'Largest contributor on a 6-person team (66 of 140 commits) across the digital binder, card-recognition scanner, and listing-scoped marketplace.',
			'Built binder persistence end to end across a Docker Compose monorepo: Next.js web, FastAPI backend, and a FastAPI scanner service on AWS Rekognition.',
			'80+ backend tests covering auth, listings, and the scanner pipeline.'
		],
		tech: [
			'Next.js',
			'TypeScript',
			'FastAPI',
			'PostgreSQL',
			'Docker Compose',
			'WebSockets',
			'AWS Rekognition'
		],
		links: [
			{ label: 'Live', href: 'https://www.deximon.ca' },
			{ label: 'Source', href: 'https://github.com/neelmu12-code/Deximon' }
		],
		year: '2026',
		image: '/projects/deximon.jpg',
		imageAlt: 'Deximon landing page with a fanned spread of Pokémon TCG cards'
	},
	{
		name: 'Puzzle Generator',
		tagline: 'The constraint-solver engine behind z9bra',
		ownership:
			'Used CP-SAT as a uniqueness oracle instead of hand-checking puzzles, so every shipped daily is provably single-solution. No unsolvable or ambiguous grids reach players.',
		highlights: [
			'Python engine that uses OR-Tools CP-SAT as a uniqueness oracle, so every puzzle is provably single-solution.',
			'Custom propagation tracer measures human deduction depth to score and tune difficulty.',
			'Built with strict TDD: property-based tests, dual-implementation cross-checks, mypy-strict clean.'
		],
		tech: ['Python 3.12', 'OR-Tools CP-SAT', 'Pydantic v2', 'pytest', 'Hypothesis', 'mypy'],
		links: [{ label: 'Source', href: 'https://github.com/egeyesss/csp-generator' }],
		year: '2026',
		image: '/projects/csp-generator.png',
		imageAlt: 'csp-generator CLI generating and exporting a 5×5 logic puzzle'
	},
	{
		name: 'Spocity',
		tagline: 'Your Spotify history as a 3D voxel city, live',
		ownership:
			'Offloaded Spotify history ingest to Celery background jobs so the OAuth flow stayed instant while heavy pulls ran out of the request path.',
		highlights: [
			'Spotify OAuth with on-demand history ingest via Django + Celery jobs.',
			'Genre rollup turns your artists into districts of a 3D voxel city in React Three Fiber, scored by a test-first ranking engine.',
			'Shareable public profiles and a postcard generator; deployed on Vercel + Railway.'
		],
		tech: ['Next.js', 'React Three Fiber', 'TypeScript', 'Django', 'Celery', 'PostgreSQL'],
		links: [
			{ label: 'Live', href: 'https://spocity.egeyesilyurt.ca' },
			{ label: 'Source', href: 'https://github.com/egeyesss/spocity' }
		],
		year: '2026',
		image: '/projects/spocity.jpg',
		imageAlt: 'Spocity landing page with a 3D voxel city built from listening history'
	},
	{
		name: 'FITIVA',
		tagline: 'Workout training planner web app',
		ownership:
			'Led the 6-person team and pushed for a repository-pattern data layer so the backend stayed testable under a tight deadline.',
		highlights: [
			'Project lead for a 6-person agile team, running sprint planning and delegation in Jira.',
			'User/trainer auth, fitness profiles, program scheduling, and workout recommendations.',
			'Repository-pattern data layer covered by Django unit tests, fully containerized.'
		],
		tech: ['Next.js', 'TypeScript', 'Django REST', 'MySQL', 'Docker'],
		links: [{ label: 'Source', href: 'https://github.com/hvpham-yorku/group2-fitiva' }],
		year: '2026',
		image: '/projects/fitiva.jpg',
		imageAlt: 'FITIVA workout planner landing page'
	}
];

// Deliberately short: every item here shows up in the projects above.
// A recruiter should see a specialist, not a checklist of everything ever touched.
export const skillGroups: { label: string; items: string[] }[] = [
	{
		label: 'Languages',
		items: ['TypeScript', 'Python', 'Rust', 'Java', 'SQL']
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

// Cycled in the hero photo frame, in order
export const heroPhotos = [
	'/photos/ege-1.jpg',
	'/photos/ege-2.jpg',
	'/photos/ege-3.jpg',
	'/photos/ege-4.jpg',
	'/photos/ege-5.jpg',
	'/photos/ege-6.jpg'
];

export interface Track {
	title: string;
	artist: string;
	/** Spotify track ID that drives the embedded player and the "open in Spotify" link. */
	spotifyId: string;
}

// Songs on repeat. The music widget plays these through Spotify's embed
// player, so there are no audio files to host, just the track IDs.
export const playlist: Track[] = [
	{ title: 'Devil in a New Dress', artist: 'Kanye West', spotifyId: '1UGD3lW3tDmgZfAVDh6w7r' },
	{ title: 'Passing Dream', artist: 'Spectrum', spotifyId: '74eUQpXsNXGD9lSyFE4F0K' },
	{ title: 'From the Start', artist: 'Laufey', spotifyId: '43iIQbw5hx986dUEZbr3eN' },
	{ title: '1998', artist: 'Lamp', spotifyId: '1XIwjLHF0gtmXXPDTYWK6p' },
	{ title: 'Strangers in the Night', artist: 'Frank Sinatra', spotifyId: '74VR3AkGPhbYXnxcOYa16x' },
	{ title: 'Ghost Town', artist: 'Kanye West', spotifyId: '7vgTNTaEz3CsBZ1N4YQalM' }
];

export const contact = {
	email: 'contact@egeyesilyurt.ca',
	github: 'https://github.com/egeyesss',
	linkedin: 'https://linkedin.com/in/egeyesss'
};

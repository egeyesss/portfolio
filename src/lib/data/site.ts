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
		name: 'KickBay',
		tagline: 'Full-stack e-commerce auction platform',
		highlights: [
			'Two auction types with real-time bidding, win history, and a complete payments + receipts flow.',
			'Django REST APIs with session auth, buyer–seller SMTP notifications, and Google Maps address capture.',
			'Deployed on a 3-node Kubernetes cluster with multi-region failover, automated MySQL backups, and a GitHub-to-VM CI/CD pipeline.'
		],
		tech: ['Next.js', 'TypeScript', 'Django REST', 'MySQL', 'Kubernetes', 'Docker'],
		links: [{ label: 'Source', href: 'https://github.com/egeyesss/eecs4413_auction' }],
		year: '2025'
	},
	{
		name: 'Lab Equipment Reservation',
		tagline: 'Multi-role JavaFX desktop system',
		highlights: [
			'Booking lifecycle, deposits/payments, and sensor-driven maintenance built on 6+ GoF patterns over MVC + service + DAO.',
			'Role-based access control across six user roles with admin approval workflows and privilege-escalation guards.',
			'Three-tier testing: hand-written JUnit, Randoop regression, and PItest mutation testing with JaCoCo coverage.'
		],
		tech: ['Java 17', 'JavaFX', 'Maven', 'JUnit 5', 'PItest'],
		links: [{ label: 'Source', href: 'https://github.com/egeyesss/eecs3311-reservation' }],
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

export const contact = {
	email: 'egeyesilyurtca@gmail.com',
	github: 'https://github.com/egeyesss',
	linkedin: 'https://linkedin.com/in/egeyesss'
};

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { contact, featured, playlist, projects, skillGroups } from './site';

// The site renders straight from this data, so a bad entry (empty field,
// http:// link, typo'd href) would ship silently. These tests catch that.
describe('site data', () => {
	const allProjects = [...featured, ...projects];

	it('has exactly two featured projects (OverTerm + z9bra)', () => {
		expect(featured).toHaveLength(2);
	});

	// The rail scrolls one offset across repeated copies of this list; a copy
	// narrower than the viewport would run out of track between wraps.
	it('has enough carousel projects for the rail to loop', () => {
		expect(projects.length).toBeGreaterThanOrEqual(3);
	});

	it.each(allProjects)('$name has complete content', (project) => {
		expect(project.name).not.toBe('');
		expect(project.tagline).not.toBe('');
		expect(project.highlights.length).toBeGreaterThan(0);
		expect(project.tech.length).toBeGreaterThan(0);
		expect(project.links.length).toBeGreaterThan(0);
	});

	it('uses https for every external link', () => {
		const links = allProjects.flatMap((p) => p.links.map((l) => l.href));
		links.push(contact.github, contact.linkedin);
		for (const href of links) {
			expect(href).toMatch(/^https:\/\//);
		}
	});

	it('references only images and videos that exist in static/', () => {
		for (const project of allProjects) {
			for (const asset of [project.image, project.video]) {
				if (asset) {
					expect(existsSync(join(process.cwd(), 'static', asset)), asset).toBe(true);
				}
			}
		}
	});

	// The clip renders in place of the image and uses it as the poster, so a
	// video without one would flash empty before the first frame decodes.
	it('gives every video a poster image', () => {
		for (const project of allProjects.filter((p) => p.video)) {
			expect(project.image, project.name).toBeTruthy();
		}
	});

	it('has no duplicate project names', () => {
		const names = allProjects.map((p) => p.name);
		expect(new Set(names).size).toBe(names.length);
	});

	it('has non-empty skill groups', () => {
		expect(skillGroups.length).toBeGreaterThan(0);
		for (const group of skillGroups) {
			expect(group.items.length).toBeGreaterThan(0);
		}
	});
});

// Recruiters read the site next to the resume and the public repos, so any
// number or label here has to match both.
describe('copy consistency', () => {
	const allProjects = [...featured, ...projects];
	const projectText = (p: (typeof allProjects)[number]) =>
		[p.tagline, p.ownership ?? '', ...p.highlights].join(' ');
	const pageSources = ['src/lib/components/Hero.svelte', 'src/routes/+page.svelte'].map((file) =>
		readFileSync(join(process.cwd(), file), 'utf8')
	);
	const everything = [...allProjects.map(projectText), ...pageSources].join('\n');

	// Suite sizes are mostly AI-generated, so they only appear where the tests
	// were a shared bar for a team: Deximon.
	it('cites a test-suite size only for Deximon', () => {
		for (const project of allProjects.filter((p) => p.name !== 'Deximon')) {
			expect(projectText(project), project.name).not.toMatch(/\d+\+?\s+(\w+\s+){0,2}tests\b/i);
		}
	});

	it('never labels a class year', () => {
		expect(everything).not.toMatch(
			/\b(\d(st|nd|rd|th)|first|second|third|fourth|fifth)[- ]year\b/i
		);
	});

	// 200+ is the number on the resume.
	it('quotes one z9bra player count everywhere, matching the resume', () => {
		const counts = new Set(
			[...everything.matchAll(/(\d+)\+\s+(unique\s+)?players/g)].map((m) => m[1])
		);
		expect([...counts]).toEqual(['200']);
	});

	// Checked against the Deximon repo: #15, #17, #18 and #19 are Ege's own PRs,
	// so the reviewed range #11 to #22 holds 8 teammate PRs, not 12.
	it('uses the repo-verified Deximon numbers', () => {
		const deximon = projectText(allProjects.find((p) => p.name === 'Deximon')!);
		expect(deximon).toContain('8 teammate pull requests');
		expect(deximon).toContain('66 of 140 commits');
	});

	it('lists the domain email address', () => {
		expect(contact.email).toBe('contact@egeyesilyurt.ca');
	});
});

describe('playlist data', () => {
	it.each(playlist)('$title has title, artist, and a Spotify id', (track) => {
		expect(track.title).not.toBe('');
		expect(track.artist).not.toBe('');
		// Spotify track ids are 22-char base62 strings.
		expect(track.spotifyId).toMatch(/^[A-Za-z0-9]{22}$/);
	});

	it('has no duplicate tracks', () => {
		const ids = playlist.map((t) => t.spotifyId);
		expect(new Set(ids).size).toBe(ids.length);
	});
});

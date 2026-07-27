import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { contact, featured, playlist, projects, skillGroups } from './site';

// The site renders straight from this data, so a bad entry (empty field,
// http:// link, typo'd href) would ship silently. These tests catch that.
describe('site data', () => {
	const allProjects = [...featured, ...projects];

	it('has exactly two featured projects (z9bra + the engine)', () => {
		expect(featured).toHaveLength(2);
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

	it('references only images that exist in static/', () => {
		for (const project of allProjects) {
			if (project.image) {
				expect(existsSync(join(process.cwd(), 'static', project.image)), project.image).toBe(true);
			}
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

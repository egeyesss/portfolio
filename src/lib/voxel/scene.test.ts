import { describe, expect, it } from 'vitest';
import { BLOCK, INNER, SCENE_H, SCENE_W, buildScene } from './scene';

const scene = buildScene();

/** Absolute bounds of every block, with its group offset applied. */
function allBlockBounds() {
	return scene.groups.flatMap((group) =>
		group.blocks.map((b) => ({
			left: group.x + b.x,
			top: group.y + b.y,
			right: group.x + b.x + b.s,
			bottom: group.y + b.y + b.s
		}))
	);
}

describe('voxel scene', () => {
	it('keeps every block inside the photo area, not the plank frame', () => {
		for (const bounds of allBlockBounds()) {
			expect(bounds.left).toBeGreaterThanOrEqual(INNER.x);
			expect(bounds.top).toBeGreaterThanOrEqual(INNER.y);
			expect(bounds.right).toBeLessThanOrEqual(INNER.x + INNER.w);
			expect(bounds.bottom).toBeLessThanOrEqual(INNER.y + INNER.h);
		}
	});

	it('rests the terrain on the photo bottom edge', () => {
		const lowest = Math.max(...allBlockBounds().map((b) => b.bottom));
		expect(lowest).toBe(INNER.y + INNER.h);
	});

	it('starts every petal inside the photo area', () => {
		for (const petal of scene.petals) {
			expect(petal.x).toBeGreaterThanOrEqual(INNER.x);
			expect(petal.x + petal.s).toBeLessThanOrEqual(INNER.x + INNER.w);
			expect(petal.y).toBeGreaterThan(INNER.y);
		}
	});

	it('is deterministic so SSR and hydration agree', () => {
		expect(buildScene()).toEqual(buildScene());
	});

	it('leaves the middle of the photo clear of trees', () => {
		const canopies = scene.groups.filter((g) => g.anim === 'sway' || g.anim === 'swaySlow');
		expect(canopies).toHaveLength(2);

		const midX = SCENE_W / 2;
		for (const canopy of canopies) {
			const right = canopy.x + Math.max(...canopy.blocks.map((b) => b.x + b.s));
			const clearsMiddle = right < midX - BLOCK || canopy.x > midX + BLOCK;
			expect(clearsMiddle).toBe(true);
		}
	});

	it('uses the 4:5 photo ratio', () => {
		expect(SCENE_W / SCENE_H).toBeCloseTo(4 / 5);
	});
});

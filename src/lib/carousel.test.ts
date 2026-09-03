import { describe, expect, it } from 'vitest';
import { COPIES, wrapOffset } from './carousel';

const SET = 1200;

describe('wrapOffset', () => {
	it('leaves an offset already inside the home copy alone', () => {
		expect(wrapOffset(SET, SET)).toBe(SET);
		expect(wrapOffset(SET + 400, SET)).toBe(SET + 400);
	});

	it('folds a drifted offset back without changing what is on screen', () => {
		// Drifting past the home copy lands on the same pixel one copy earlier.
		expect(wrapOffset(2 * SET + 50, SET)).toBe(SET + 50);
	});

	it('folds a leftward step back up into the home copy', () => {
		expect(wrapOffset(SET - 50, SET)).toBe(2 * SET - 50);
		expect(wrapOffset(-30, SET)).toBe(2 * SET - 30);
	});

	it('always returns an offset inside the home copy', () => {
		for (const offset of [-5000, -1, 0, 1, 999, 4801, 123456.7]) {
			const wrapped = wrapOffset(offset, SET);
			expect(wrapped).toBeGreaterThanOrEqual(SET);
			expect(wrapped).toBeLessThan(2 * SET);
		}
	});

	it('preserves the offset modulo one copy, so nothing visually jumps', () => {
		for (const offset of [-5000, 0, 4801, 123456.7]) {
			expect((wrapOffset(offset, SET) - offset) % SET).toBeCloseTo(0, 6);
		}
	});

	it('passes the offset through when the rail has not been measured yet', () => {
		expect(wrapOffset(240, 0)).toBe(240);
	});

	it('leaves a full copy of headroom on each side of the home copy', () => {
		expect(COPIES).toBeGreaterThanOrEqual(3);
	});
});

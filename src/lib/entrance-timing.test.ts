import { describe, expect, it } from 'vitest';
import { DURATION, END, INTRO_END, PAINT_END, SLIDE_START } from './entrance-timing';

describe('entrance timing', () => {
	// It plays on every load, so the whole thing has to stay short enough that
	// a recruiter never feels made to wait.
	it('finishes within 2.5 seconds', () => {
		expect(END).toBeLessThanOrEqual(2.5);
	});

	it('runs its phases in order: fly in, paint, exit, slide up', () => {
		expect(0).toBeLessThan(INTRO_END);
		expect(INTRO_END).toBeLessThan(PAINT_END);
		expect(PAINT_END).toBeLessThan(SLIDE_START);
		expect(SLIDE_START).toBeLessThan(DURATION);
		expect(DURATION).toBeLessThanOrEqual(END);
	});
});

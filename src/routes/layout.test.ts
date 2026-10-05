import { beforeEach, describe, expect, it, vi } from 'vitest';

const injectAnalytics = vi.fn();
vi.mock('@vercel/analytics/sveltekit', () => ({ injectAnalytics }));

const environment = { dev: false };
vi.mock('$app/environment', () => environment);

async function loadLayout() {
	vi.resetModules();
	await import('./+layout');
}

describe('root layout analytics', () => {
	beforeEach(() => injectAnalytics.mockClear());

	it('injects Vercel Web Analytics in production mode for deployed builds', async () => {
		environment.dev = false;
		await loadLayout();
		expect(injectAnalytics).toHaveBeenCalledExactlyOnceWith({ mode: 'production' });
	});

	// Development mode loads the debug script and sends nothing, so local
	// `npm run dev` sessions never inflate the visitor counts.
	it('switches to development mode under vite dev', async () => {
		environment.dev = true;
		await loadLayout();
		expect(injectAnalytics).toHaveBeenCalledExactlyOnceWith({ mode: 'development' });
	});
});

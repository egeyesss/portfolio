<script lang="ts">
	import gsap from 'gsap';
	import type { Project } from '$lib/data/site';
	import { COPIES, wrapOffset } from '$lib/carousel';
	import { reveal } from '$lib/actions/reveal';
	import ProjectCard from './ProjectCard.svelte';

	let { projects }: { projects: Project[] } = $props();

	const DRIFT_PX_PER_SEC = 22;
	/** How long an arrow press buys the reader before the drift picks back up. */
	const READ_PAUSE_MS = 10_000;

	let viewport: HTMLDivElement | undefined = $state();
	let track: HTMLUListElement | undefined = $state();

	let drifts = $state(false);
	let pointerOver = $state(false);
	let keyboardIn = $state(false);
	let onScreen = $state(false);
	let holding = $state(false);

	// One copy under reduced motion: nothing loops, so repeats would just be
	// the same four projects listed over again.
	const copies = $derived(drifts ? COPIES : 1);

	let holdTimer: ReturnType<typeof setTimeout> | undefined;

	function hold() {
		holding = true;
		clearTimeout(holdTimer);
		holdTimer = setTimeout(() => (holding = false), READ_PAUSE_MS);
	}

	/**
	 * Card width plus the gap, measured rather than restated from the classes.
	 * setWidth is 0 until the extra copies render, which is what tells the rest
	 * of the component there is nothing to wrap around yet.
	 */
	function metrics() {
		const items = track?.children;
		if (!items || items.length < 2) return { step: 0, setWidth: 0 };
		const first = (items[0] as HTMLElement).offsetLeft;
		return {
			step: (items[1] as HTMLElement).offsetLeft - first,
			setWidth:
				items.length > projects.length
					? (items[projects.length] as HTMLElement).offsetLeft - first
					: 0
		};
	}

	function step(direction: 1 | -1) {
		if (!viewport) return;
		hold();
		const { step: cardStep, setWidth } = metrics();
		const from = wrapOffset(viewport.scrollLeft, setWidth);
		viewport.scrollLeft = from;
		viewport.scrollTo({ left: from + direction * cardStep, behavior: 'smooth' });
	}

	$effect(() => {
		const mm = gsap.matchMedia();
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			drifts = true;
			return () => (drifts = false);
		});
		return () => mm.revert();
	});

	$effect(() => {
		if (!viewport) return;
		const observer = new IntersectionObserver((entries) => (onScreen = entries[0].isIntersecting));
		observer.observe(viewport);
		return () => observer.disconnect();
	});

	$effect(() => {
		const rail = viewport;
		// Re-runs once the extra copies are in the DOM, so metrics() can see them.
		if (!drifts || !rail || copies < COPIES) return;

		let offset = 0;
		let running = false;

		function tick(_time: number, deltaMs: number) {
			if (pointerOver || keyboardIn || holding || !onScreen) {
				running = false;
				return;
			}
			const { setWidth } = metrics();
			if (setWidth <= 0) return;
			// Resync on the first frame after a pause: the reader may have swiped,
			// or an arrow's smooth scroll may have finished somewhere else.
			if (!running) {
				offset = wrapOffset(rail!.scrollLeft, setWidth);
				running = true;
			}
			offset = wrapOffset(offset + (DRIFT_PX_PER_SEC * deltaMs) / 1000, setWidth);
			rail!.scrollLeft = offset;
		}

		rail.scrollLeft = metrics().setWidth;
		gsap.ticker.add(tick);
		return () => gsap.ticker.remove(tick);
	});

	$effect(() => () => clearTimeout(holdTimer));
</script>

<div use:reveal class="mt-16">
	<div class="mb-6 flex items-center justify-between gap-4">
		<h3 class="font-display text-xl font-bold tracking-tight">More projects</h3>

		<div class="flex gap-2">
			<button
				type="button"
				aria-label="Previous project"
				onclick={() => step(-1)}
				class="rounded-md border border-edge px-3 py-2 text-fog transition-colors hover:border-volt hover:text-volt"
			>
				<span aria-hidden="true">←</span>
			</button>
			<button
				type="button"
				aria-label="Next project"
				onclick={() => step(1)}
				class="rounded-md border border-edge px-3 py-2 text-fog transition-colors hover:border-volt hover:text-volt"
			>
				<span aria-hidden="true">→</span>
			</button>
		</div>
	</div>

	<!-- Bleeds past the section padding so cards slide off the edge instead of stopping short of it. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		bind:this={viewport}
		role="region"
		aria-label="More projects"
		tabindex="0"
		class="rail -mx-4 overflow-x-auto px-4 outline-offset-4 focus-visible:outline-2 focus-visible:outline-volt sm:-mx-6 sm:px-6"
		class:looping={drifts}
		onpointerenter={() => (pointerOver = true)}
		onpointerleave={() => (pointerOver = false)}
		onpointerdown={hold}
		onfocusin={() => (keyboardIn = true)}
		onfocusout={() => (keyboardIn = false)}
	>
		<ul bind:this={track} class="flex w-max gap-6">
			{#each { length: copies }, copy (copy)}
				{#each projects as project (project.name)}
					<li class="w-[300px] shrink-0 sm:w-[340px]" inert={copy > 0}>
						<ProjectCard {project} />
					</li>
				{/each}
			{/each}
		</ul>
	</div>
</div>

<style>
	.rail {
		scrollbar-width: none;
	}
	.rail::-webkit-scrollbar {
		display: none;
	}

	/* Only while the rail loops: a static list would fade its own first card. */
	.rail.looping {
		mask-image: linear-gradient(
			to right,
			transparent,
			#000 2.5rem,
			#000 calc(100% - 2.5rem),
			transparent
		);
	}
</style>

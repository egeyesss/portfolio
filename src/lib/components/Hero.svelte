<script lang="ts">
	import gsap from 'gsap';

	let heroEl: HTMLElement;

	$effect(() => {
		const mm = gsap.matchMedia();
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			gsap
				.timeline({ defaults: { ease: 'power3.out' } })
				.from('[data-hero-line]', { y: 60, autoAlpha: 0, duration: 0.9, stagger: 0.12 })
				.from('[data-hero-cta]', { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, '-=0.3');
		});
		return () => mm.revert();
	});
</script>

<section
	bind:this={heroEl}
	class="bg-grid relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-16 text-center"
>
	<p data-hero-line class="mb-4 font-display text-xs tracking-[0.35em] text-dim sm:text-sm">
		// SOFTWARE ENGINEER — TORONTO
	</p>

	<h1
		data-hero-line
		class="font-display text-5xl leading-none font-bold tracking-tight uppercase sm:text-7xl lg:text-8xl"
	>
		Ege<br class="sm:hidden" />
		<span class="text-volt">Yesilyurt</span>
	</h1>

	<p data-hero-line class="mt-6 max-w-xl text-base text-dim sm:text-lg">
		4th-year Software Engineering student at York University. I build and ship full-stack products —
		most recently a daily puzzle game with
		<span class="font-semibold text-fog">500+ players</span>.
	</p>

	<div data-hero-cta class="mt-10 flex flex-wrap items-center justify-center gap-4">
		<a
			href="#projects"
			class="clip-panel bg-volt px-8 py-3 font-display text-sm font-bold tracking-[0.2em] text-ink transition hover:bg-fog"
		>
			SEE PROJECTS
		</a>
		<a
			href="/resume.pdf"
			target="_blank"
			rel="noopener"
			class="clip-panel border border-edge px-8 py-3 font-display text-sm tracking-[0.2em] text-fog transition hover:border-volt hover:text-volt"
		>
			RESUME
		</a>
	</div>

	<!-- decorative corner ticks -->
	<div
		aria-hidden="true"
		class="absolute top-24 left-6 hidden font-display text-xs text-edge md:block"
	>
		[ 01 ]
	</div>
	<div
		aria-hidden="true"
		class="absolute right-6 bottom-10 hidden font-display text-xs text-edge md:block"
	>
		SCROLL ↓
	</div>
</section>

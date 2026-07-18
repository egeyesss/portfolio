<script lang="ts">
	import gsap from 'gsap';
	import { entrance } from '$lib/state/entrance.svelte';
	import { contact } from '$lib/data/site';
	import PhotoCycler from './PhotoCycler.svelte';

	$effect(() => {
		// Hold the intro until the entrance window starts lifting, so the
		// hero animates into view as the page is revealed.
		if (!entrance.done) return;
		const mm = gsap.matchMedia();
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			gsap
				.timeline({ defaults: { ease: 'power3.out' } })
				.from('[data-hero-line]', { y: 60, autoAlpha: 0, duration: 0.9, stagger: 0.12 })
				.from('[data-hero-photo]', { y: 30, autoAlpha: 0, duration: 0.8 }, '-=0.5')
				.from('[data-hero-cta]', { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, '-=0.4');
		});
		return () => mm.revert();
	});
</script>

<section class="bg-grid relative flex min-h-svh items-center px-4 pt-24 pb-16 sm:px-6">
	<div class="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
		<div class="text-center md:text-left">
			<p data-hero-line class="mb-4 font-display text-sm tracking-[0.2em] text-dim uppercase">
				Full-Stack Developer · 📍 Toronto, Canada
			</p>

			<h1
				data-hero-line
				class="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
			>
				Ege <span class="text-volt">Yesilyurt</span>
			</h1>

			<p data-hero-line class="mx-auto mt-6 max-w-xl text-base text-dim sm:text-lg md:mx-0">
				4th-year Software Engineering student at York University. I build and ship full-stack
				products — most recently a daily puzzle game with
				<span class="font-semibold text-fog">500+ players</span>.
			</p>

			<div class="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
				<a
					data-hero-cta
					href="#projects"
					class="rounded-md bg-volt px-7 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-fog"
				>
					See projects
				</a>
				<a
					data-hero-cta
					href="/resume.pdf"
					target="_blank"
					rel="noopener"
					class="rounded-md border border-edge px-7 py-3 font-display text-sm text-fog transition-colors hover:border-volt hover:text-volt"
				>
					Resume
				</a>
			</div>

			<!-- everything a recruiter needs, no scrolling required -->
			<div
				data-hero-cta
				class="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-display text-sm text-dim md:justify-start"
			>
				<a
					href={contact.github}
					target="_blank"
					rel="noopener"
					class="transition-colors hover:text-volt"
				>
					GitHub ↗
				</a>
				<a
					href={contact.linkedin}
					target="_blank"
					rel="noopener"
					class="transition-colors hover:text-volt"
				>
					LinkedIn ↗
				</a>
				<a href="mailto:{contact.email}" class="transition-colors hover:text-volt">
					{contact.email}
				</a>
			</div>
		</div>

		<div data-hero-photo class="mx-auto w-full max-w-xs md:max-w-sm">
			<PhotoCycler />
		</div>
	</div>
</section>

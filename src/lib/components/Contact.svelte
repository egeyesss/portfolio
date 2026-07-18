<script lang="ts">
	import { contact } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './SectionHeading.svelte';
</script>

<section id="contact" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
	<SectionHeading index="03" title="Contact" />

	<div use:reveal class="clip-panel border border-edge bg-panel p-8 sm:p-12">
		<p class="font-display text-3xl font-bold tracking-tight uppercase sm:text-5xl">
			Let's <span class="text-volt">talk</span>.
		</p>
		<p class="mt-4 max-w-xl text-dim">
			Looking for new-grad software engineering roles. If you're hiring — or just want to argue
			about logic puzzles — my inbox is open.
		</p>

		<div class="mt-8 flex flex-wrap gap-x-8 gap-y-4 font-display text-sm tracking-[0.15em]">
			<a href="mailto:{contact.email}" class="glitch-hover font-bold text-volt uppercase">
				Email ↗
			</a>
			<a
				href={contact.github}
				target="_blank"
				rel="noopener"
				class="glitch-hover font-bold text-fog uppercase"
			>
				GitHub ↗
			</a>
			<a
				href={contact.linkedin}
				target="_blank"
				rel="noopener"
				class="glitch-hover font-bold text-fog uppercase"
			>
				LinkedIn ↗
			</a>
			<a
				href="/resume.pdf"
				target="_blank"
				rel="noopener"
				class="glitch-hover font-bold text-fog uppercase"
			>
				Resume ↗
			</a>
		</div>
	</div>
</section>

<footer
	class="border-t border-edge py-8 text-center font-display text-xs tracking-[0.25em] text-dim"
>
	© 2026 EGE YESILYURT — SVELTEKIT + GSAP
</footer>

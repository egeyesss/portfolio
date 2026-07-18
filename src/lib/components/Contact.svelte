<script lang="ts">
	import { contact } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './SectionHeading.svelte';
</script>

<section id="contact" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
	<SectionHeading title="Contact" />

	<div use:reveal class="rounded-xl border border-edge bg-panel p-8 sm:p-12">
		<p class="font-display text-3xl font-bold tracking-tight sm:text-4xl">
			Let's <span class="text-volt">talk</span>.
		</p>
		<p class="mt-4 max-w-xl text-dim">
			Based in Toronto. Looking for internships/new-grad software engineering roles. If you're hiring, or just
			want to argue about logic puzzles, my inbox is open.
		</p>

		<div class="mt-8 flex flex-wrap gap-x-8 gap-y-4 font-display text-sm font-semibold">
			<a href="mailto:{contact.email}" class="text-volt transition-colors hover:text-fog">
				Email ↗
			</a>
			<a
				href={contact.github}
				target="_blank"
				rel="noopener"
				class="text-fog transition-colors hover:text-volt"
			>
				GitHub ↗
			</a>
			<a
				href={contact.linkedin}
				target="_blank"
				rel="noopener"
				class="text-fog transition-colors hover:text-volt"
			>
				LinkedIn ↗
			</a>
			<a
				href="/resume.pdf"
				target="_blank"
				rel="noopener"
				class="text-fog transition-colors hover:text-volt"
			>
				Resume ↗
			</a>
		</div>
	</div>
</section>

<footer class="border-t border-edge py-8 text-center font-display text-xs text-dim">
	© 2026 Ege Yesilyurt · Built with SvelteKit + GSAP
</footer>

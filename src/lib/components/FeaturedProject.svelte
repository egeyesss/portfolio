<script lang="ts">
	import type { Project } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';

	let { project, badge }: { project: Project; badge: string } = $props();
</script>

<article use:reveal class="clip-panel relative border border-edge bg-panel p-6 sm:p-10">
	<div class="mb-6 flex flex-wrap items-center justify-between gap-3">
		<span class="font-display text-xs tracking-[0.3em] text-blood">{badge}</span>
		<span class="font-display text-xs tracking-[0.3em] text-dim">{project.year}</span>
	</div>

	<h3 class="font-display text-3xl font-bold tracking-tight uppercase sm:text-5xl">
		{project.name}
	</h3>
	<p class="mt-2 text-base text-volt sm:text-lg">{project.tagline}</p>

	<ul class="mt-6 max-w-3xl space-y-3 text-sm text-dim sm:text-base">
		{#each project.highlights as highlight (highlight)}
			<li class="flex gap-3">
				<span aria-hidden="true" class="mt-1 text-volt">▸</span>
				<span>{highlight}</span>
			</li>
		{/each}
	</ul>

	<div class="mt-8 flex flex-wrap gap-2">
		{#each project.tech as tech (tech)}
			<span class="border border-edge px-3 py-1 font-display text-xs tracking-wider text-dim">
				{tech}
			</span>
		{/each}
	</div>

	<div class="mt-8 flex flex-wrap gap-4">
		{#each project.links as link (link.href)}
			<a
				href={link.href}
				target="_blank"
				rel="noopener"
				class="clip-panel bg-volt px-6 py-2 font-display text-sm font-bold tracking-[0.15em] text-ink uppercase transition hover:bg-fog"
			>
				{link.label} ↗
			</a>
		{/each}
	</div>
</article>

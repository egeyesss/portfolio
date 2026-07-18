<script lang="ts">
	import type { Project } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';

	let { project, delay = 0 }: { project: Project; delay?: number } = $props();
</script>

<article
	use:reveal={{ delay }}
	class="clip-panel group flex flex-col border border-edge bg-panel p-6 transition-colors hover:border-volt/60"
>
	<div class="mb-4 flex items-baseline justify-between gap-3">
		<h3 class="font-display text-xl font-bold tracking-tight uppercase">{project.name}</h3>
		<span class="font-display text-xs tracking-[0.25em] text-dim">{project.year}</span>
	</div>

	<p class="text-sm text-volt">{project.tagline}</p>

	<ul class="mt-4 flex-1 space-y-2 text-sm text-dim">
		{#each project.highlights as highlight (highlight)}
			<li class="flex gap-2">
				<span aria-hidden="true" class="text-edge group-hover:text-volt">▸</span>
				<span>{highlight}</span>
			</li>
		{/each}
	</ul>

	<div class="mt-5 flex flex-wrap gap-1.5">
		{#each project.tech as tech (tech)}
			<span class="border border-edge px-2 py-0.5 font-display text-[11px] tracking-wider text-dim">
				{tech}
			</span>
		{/each}
	</div>

	<div class="mt-5 flex gap-4">
		{#each project.links as link (link.href)}
			<a
				href={link.href}
				target="_blank"
				rel="noopener"
				class="glitch-hover font-display text-sm font-bold tracking-[0.15em] text-volt uppercase"
			>
				{link.label} ↗
			</a>
		{/each}
	</div>
</article>

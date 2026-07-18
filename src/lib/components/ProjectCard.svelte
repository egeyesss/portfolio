<script lang="ts">
	import type { Project } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';

	let { project, delay = 0 }: { project: Project; delay?: number } = $props();
</script>

<article
	use:reveal={{ delay }}
	class="group flex flex-col rounded-xl border border-edge bg-panel p-6 transition-colors hover:border-volt/50"
>
	<div class="mb-4 flex items-baseline justify-between gap-3">
		<h3 class="font-display text-xl font-bold tracking-tight">{project.name}</h3>
		<span class="font-display text-sm text-dim">{project.year}</span>
	</div>

	<p class="text-sm text-volt">{project.tagline}</p>

	<ul class="mt-4 flex-1 space-y-2 text-sm text-dim">
		{#each project.highlights as highlight (highlight)}
			<li class="flex gap-2.5">
				<span
					aria-hidden="true"
					class="mt-2 h-1 w-1 shrink-0 rounded-full bg-edge transition-colors group-hover:bg-volt"
				></span>
				<span>{highlight}</span>
			</li>
		{/each}
	</ul>

	<div class="mt-5 flex flex-wrap gap-1.5">
		{#each project.tech as tech (tech)}
			<span class="rounded-full border border-edge px-2.5 py-0.5 text-[11px] text-dim">{tech}</span>
		{/each}
	</div>

	<div class="mt-5 flex gap-4">
		{#each project.links as link (link.href)}
			<a
				href={link.href}
				target="_blank"
				rel="noopener"
				class="font-display text-sm font-semibold text-volt transition-colors hover:text-fog"
			>
				{link.label} ↗
			</a>
		{/each}
	</div>
</article>

<script lang="ts">
	import type { Project } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';

	let { project, badge }: { project: Project; badge: string } = $props();
</script>

<article use:reveal class="rounded-xl border border-edge bg-panel p-6 sm:p-10">
	<div class="mb-6 flex flex-wrap items-center justify-between gap-3">
		<span class="rounded-full bg-volt/10 px-3 py-1 font-display text-xs font-semibold text-volt">
			{badge}
		</span>
		<span class="font-display text-sm text-dim">{project.year}</span>
	</div>

	<div class="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
		<div>
			<h3 class="font-display text-3xl font-bold tracking-tight sm:text-4xl">{project.name}</h3>
			<p class="mt-2 text-base text-volt sm:text-lg">{project.tagline}</p>

			<ul class="mt-6 space-y-3 text-sm text-dim sm:text-base">
				{#each project.highlights as highlight (highlight)}
					<li class="flex gap-3">
						<span aria-hidden="true" class="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-volt"></span>
						<span>{highlight}</span>
					</li>
				{/each}
			</ul>

			<div class="mt-8 flex flex-wrap gap-2">
				{#each project.tech as tech (tech)}
					<span class="rounded-full border border-edge px-3 py-1 text-xs text-dim">{tech}</span>
				{/each}
			</div>

			<div class="mt-8 flex flex-wrap gap-4">
				{#each project.links as link (link.href)}
					<a
						href={link.href}
						target="_blank"
						rel="noopener"
						class="rounded-md bg-volt px-6 py-2.5 font-display text-sm font-semibold text-ink transition-colors hover:bg-fog"
					>
						{link.label} ↗
					</a>
				{/each}
			</div>
		</div>

		{#if project.image}
			<a
				href={project.links[0].href}
				target="_blank"
				rel="noopener"
				class="group block overflow-hidden rounded-lg border border-edge transition-colors hover:border-volt/50"
			>
				<img
					src={project.image}
					alt={project.imageAlt ?? project.name}
					loading="lazy"
					class="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
				/>
			</a>
		{/if}
	</div>
</article>

<script lang="ts">
	import { skillGroups } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './SectionHeading.svelte';
</script>

<section id="stack" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
	<SectionHeading index="02" title="Stack" />

	<div class="grid gap-6 md:grid-cols-3">
		{#each skillGroups as group, i (group.label)}
			<div use:reveal={{ delay: i * 0.1 }} class="clip-panel border border-edge bg-panel p-6">
				<h3 class="mb-4 font-display text-sm font-bold tracking-[0.25em] text-volt uppercase">
					{group.label}
				</h3>
				<ul class="flex flex-wrap gap-2">
					{#each group.items as item (item)}
						<li class="border border-edge px-3 py-1 font-display text-xs tracking-wider text-dim">
							{item}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<script lang="ts">
	import { heroPhotos } from '$lib/data/site';
	import VoxelFrame from './VoxelFrame.svelte';

	const INTERVAL_MS = 3500;
	let index = $state(0);

	$effect(() => {
		// Reduced-motion users get a static first photo
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = setInterval(() => {
			index = (index + 1) % heroPhotos.length;
		}, INTERVAL_MS);
		return () => clearInterval(id);
	});
</script>

<div class="relative aspect-4/5 w-full overflow-hidden rounded-xl border border-edge bg-panel">
	{#each heroPhotos as src, i (src)}
		<img
			{src}
			alt={i === 0 ? 'Ege Yesilyurt' : ''}
			class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
			style="opacity: {i === index ? 1 : 0};"
		/>
	{/each}
	<VoxelFrame />
	<!-- subtle inner ring so photo edges read cleanly on any image -->
	<div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/5 ring-inset"></div>
</div>

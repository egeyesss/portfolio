<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let { index, title }: { index: string; title: string } = $props();
</script>

<div use:reveal class="mb-12 flex items-baseline gap-4">
	<span class="font-display text-sm tracking-[0.3em] text-volt">{index} /</span>
	<h2 class="font-display text-3xl font-bold tracking-tight uppercase sm:text-4xl">{title}</h2>
	<div class="ml-4 hidden h-px flex-1 bg-edge sm:block"></div>
</div>

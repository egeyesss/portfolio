<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let { title }: { title: string } = $props();
</script>

<div use:reveal class="mb-12">
	<h2 class="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
	<div class="mt-4 h-0.5 w-16 bg-volt"></div>
</div>

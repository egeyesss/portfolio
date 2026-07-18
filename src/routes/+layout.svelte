<script lang="ts">
	import '@fontsource/chakra-petch/400.css';
	import '@fontsource/chakra-petch/700.css';
	import '@fontsource/space-grotesk/400.css';
	import '@fontsource/space-grotesk/600.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

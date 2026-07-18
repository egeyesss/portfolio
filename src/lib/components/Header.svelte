<script lang="ts">
	import { browser } from '$app/environment';

	// Drop the graffiti logo at static/logo.png and it replaces the text
	// wordmark automatically. The img only renders client-side — a
	// build-time reference to a missing file fails the prerender crawl.
	let logoLoaded = $state(false);
</script>

<header class="fixed inset-x-0 top-0 z-50 border-b border-edge bg-ink/85 backdrop-blur-md">
	<div class="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
		<nav class="flex gap-5 font-display text-xs tracking-[0.2em] text-dim sm:gap-8 sm:text-sm">
			<a href="#projects" class="glitch-hover transition-colors hover:text-fog">PROJECTS</a>
			<a href="#stack" class="glitch-hover transition-colors hover:text-fog">STACK</a>
		</nav>

		<a href="#top" aria-label="Back to top" class="justify-self-center">
			{#if browser}
				<img
					src="/logo.png"
					alt="Ege Y"
					class="h-10 w-auto"
					class:hidden={!logoLoaded}
					onload={() => (logoLoaded = true)}
				/>
			{/if}
			{#if !logoLoaded}
				<span class="font-display text-xl font-bold tracking-widest text-fog">
					EGE<span class="text-volt">Y</span>
				</span>
			{/if}
		</a>

		<nav
			class="flex justify-end gap-5 font-display text-xs tracking-[0.2em] text-dim sm:gap-8 sm:text-sm"
		>
			<a href="#contact" class="glitch-hover transition-colors hover:text-fog">CONTACT</a>
			<a
				href="/resume.pdf"
				target="_blank"
				rel="noopener"
				class="glitch-hover text-volt transition-colors hover:text-fog"
			>
				RESUME
			</a>
		</nav>
	</div>
</header>

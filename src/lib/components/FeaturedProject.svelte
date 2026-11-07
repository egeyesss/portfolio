<script lang="ts">
	import type { Project } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';

	let { project, badge, delay = 0 }: { project: Project; badge: string; delay?: number } = $props();

	let clip: HTMLVideoElement | undefined = $state();

	$effect(() => {
		if (!clip) return;
		// Reduced-motion visitors keep the poster frame, which is the clip's own frame 0.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const el = clip;
		// A loop that runs while the card is scrolled away is battery for nothing.
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) el.play().catch(() => {});
			else el.pause();
		});
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<article
	use:reveal={{ delay }}
	class="group flex h-full flex-col overflow-hidden rounded-xl border border-edge bg-panel transition-colors hover:border-volt/50"
>
	{#if project.video || project.image}
		<a href={project.links[0].href} target="_blank" rel="noopener" class="block overflow-hidden">
			{#if project.video}
				<video
					bind:this={clip}
					poster={project.image}
					aria-label={project.imageAlt ?? project.name}
					muted
					loop
					playsinline
					preload="metadata"
					class="aspect-16/10 w-full border-b border-edge object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
				>
					<source src={project.video} type="video/mp4" />
				</video>
			{:else}
				<img
					src={project.image}
					alt={project.imageAlt ?? project.name}
					class="aspect-16/10 w-full border-b border-edge object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
				/>
			{/if}
		</a>
	{/if}

	<div class="flex flex-1 flex-col p-6 sm:p-8">
		<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
			<span class="rounded-full bg-volt/10 px-3 py-1 font-display text-xs font-semibold text-volt">
				{badge}
			</span>
			<span class="font-display text-sm text-dim">{project.year}</span>
		</div>

		<h3 class="font-display text-3xl font-bold tracking-tight">{project.name}</h3>
		<p class="mt-2 text-base text-volt">{project.tagline}</p>

		{#if project.ownership}
			<p class="mt-5 border-l-2 border-volt/50 pl-4 text-sm text-fog sm:text-base">
				{project.ownership}
			</p>
		{/if}

		<ul class="mt-6 flex-1 space-y-3 text-sm text-dim sm:text-base">
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

		<div class="mt-8 flex flex-wrap gap-3">
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
</article>

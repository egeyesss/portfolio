<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import FeaturedProject from '$lib/components/FeaturedProject.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import { featured, projects } from '$lib/data/site';
</script>

<svelte:head>
	<title>Ege Yesilyurt — Software Engineer</title>
	<meta
		name="description"
		content="Software engineering student at York University. Builder of z9bra, a daily logic-puzzle game with 500+ players, and the open-source constraint-solver engine behind it."
	/>
	<meta property="og:title" content="Ege Yesilyurt — Software Engineer" />
	<meta
		property="og:description"
		content="Full-stack projects: z9bra daily puzzle game, CP-SAT puzzle generator, and more."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<div id="top">
	<Header />
	<main>
		<Hero />

		<section id="projects" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
			<SectionHeading index="01" title="Projects" />

			<div class="space-y-8">
				<FeaturedProject project={featured[0]} badge="FEATURED — LIVE" />
				<FeaturedProject project={featured[1]} badge="FEATURED — THE ENGINE" />
			</div>

			<div class="mt-8 grid gap-6 lg:grid-cols-3">
				{#each projects as project, i (project.name)}
					<ProjectCard {project} delay={i * 0.1} />
				{/each}
			</div>
		</section>

		<Skills />
		<Contact />
	</main>
</div>

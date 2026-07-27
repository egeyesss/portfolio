<script lang="ts">
	import Entrance from '$lib/components/Entrance.svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import FeaturedProject from '$lib/components/FeaturedProject.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import MusicWidget from '$lib/components/MusicWidget.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import { contact, featured, projects } from '$lib/data/site';
</script>

<svelte:head>
	<title>Ege Yesilyurt · Software Engineer</title>
	<meta
		name="description"
		content="4th-year Software Engineering student at York University in Toronto. I build and ship full-stack products."
	/>

	<!-- Link previews: og:image must be absolute, so it is hardcoded to the live domain -->
	<meta property="og:title" content="Ege Yesilyurt · Software Engineer" />
	<meta
		property="og:description"
		content="4th-year Software Engineering student at York University. I build and ship full-stack products. Check out my website!"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://egeyesilyurt.ca/" />
	<meta property="og:site_name" content="Ege Yesilyurt" />
	<meta property="og:image" content="https://egeyesilyurt.ca/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Ege Yesilyurt, full-stack developer in Toronto" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Ege Yesilyurt · Software Engineer" />
	<meta
		name="twitter:description"
		content="4th-year Software Engineering student at York University. I build and ship full-stack products. Check out my website!"
	/>
	<meta name="twitter:image" content="https://egeyesilyurt.ca/og.png" />
</svelte:head>

<div id="top">
	<Entrance />
	<Header />
	<main>
		<Hero />

		<section id="projects" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
			<SectionHeading title="Projects" />

			<div class="space-y-8">
				<FeaturedProject project={featured[0]} badge="Featured · Live" />
				<FeaturedProject project={featured[1]} badge="Featured · Open source" />
			</div>

			<div class="mt-8 grid gap-6 lg:grid-cols-3">
				{#each projects as project, i (project.name)}
					<ProjectCard {project} delay={i * 0.1} />
				{/each}
			</div>

			<div class="mt-10 text-center">
				<a
					href={contact.github}
					target="_blank"
					rel="noopener"
					class="inline-block rounded-md border border-edge px-7 py-3 font-display text-sm text-fog transition-colors hover:border-volt hover:text-volt"
				>
					See all projects on GitHub ↗
				</a>
			</div>
		</section>

		<Skills />
		<Contact />
	</main>

	<MusicWidget />
</div>

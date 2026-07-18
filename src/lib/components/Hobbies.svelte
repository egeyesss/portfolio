<script lang="ts">
	import { hobbies } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './SectionHeading.svelte';
</script>

<section id="beyond" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
	<SectionHeading title="Off the clock" />

	<div use:reveal class="rounded-xl border border-edge bg-panel p-8 sm:p-10">
		<p class="max-w-2xl text-dim">
			Not everything is a commit. When the laptop closes I'm usually planning the next trip, out on
			a trail, or mid-rally — and on quiet nights, queued up with friends.
		</p>

		<ul class="mt-6 flex flex-wrap gap-2.5">
			{#each hobbies as hobby (hobby.label)}
				<li
					class="flex items-center gap-2 rounded-full border border-edge px-4 py-1.5 text-sm text-fog transition-colors hover:border-volt/50"
				>
					<span aria-hidden="true">{hobby.emoji}</span>
					{hobby.label}
				</li>
			{/each}
		</ul>
	</div>
</section>

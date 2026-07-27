<script lang="ts">
	import { onMount } from 'svelte';
	import { playlist } from '$lib/data/site';
	import { entrance } from '$lib/state/entrance.svelte';

	// Minimal shape of the bits of Spotify's iFrame API we actually call.
	interface EmbedController {
		loadUri(uri: string): void;
		play(): void;
		destroy(): void;
		addListener(
			event: string,
			cb: (e: { data: { isPaused: boolean; position: number; duration: number } }) => void
		): void;
	}
	interface SpotifyIFrameApi {
		createController(
			el: HTMLElement,
			opts: { uri: string; width?: string | number; height?: string | number },
			cb: (controller: EmbedController) => void
		): void;
	}

	let embedTarget: HTMLDivElement;
	let controller: EmbedController | null = null;
	let current = $state(0);
	let isPaused = $state(true);
	let open = $state(true);
	let advancing = false;

	const uri = (i: number) => `spotify:track:${playlist[i].spotifyId}`;

	function playIndex(i: number) {
		current = ((i % playlist.length) + playlist.length) % playlist.length;
		if (!controller) return;
		controller.loadUri(uri(current));
		// A click is a user gesture, so autoplay is allowed here.
		controller.play();
	}

	onMount(() => {
		const w = window as unknown as {
			onSpotifyIframeApiReady?: (api: SpotifyIFrameApi) => void;
			SpotifyIframeApi?: SpotifyIFrameApi;
		};

		const init = (api: SpotifyIFrameApi) => {
			api.createController(embedTarget, { uri: uri(current), width: '100%', height: 80 }, (c) => {
				controller = c;
				c.addListener('playback_update', (e) => {
					isPaused = e.data.isPaused;
					// Best-effort auto-advance when a track runs out.
					const { position, duration } = e.data;
					if (!e.data.isPaused && duration > 0 && position >= duration - 800 && !advancing) {
						advancing = true;
						playIndex(current + 1);
						setTimeout(() => (advancing = false), 1500);
					}
				});
			});
		};

		if (w.SpotifyIframeApi) {
			init(w.SpotifyIframeApi);
		} else {
			w.onSpotifyIframeApiReady = (api) => {
				w.SpotifyIframeApi = api;
				init(api);
			};
			if (!document.getElementById('spotify-iframe-api')) {
				const s = document.createElement('script');
				s.id = 'spotify-iframe-api';
				s.src = 'https://open.spotify.com/embed/iframe-api/v1';
				s.async = true;
				document.body.appendChild(s);
			}
		}

		return () => {
			controller?.destroy();
			controller = null;
		};
	});
</script>

<div
	class="fixed right-4 bottom-4 z-40 w-[300px] max-w-[calc(100vw-2rem)] transition-opacity duration-500 {entrance.done
		? 'opacity-100'
		: 'pointer-events-none opacity-0'}"
>
	<div class="overflow-hidden rounded-xl border border-edge bg-panel shadow-2xl shadow-black/60">
		<!-- Header: label + minimize toggle -->
		<div class="flex items-center justify-between gap-2 px-3 py-2">
			<span
				class="flex items-center gap-2 font-display text-xs tracking-[0.2em] text-dim uppercase"
			>
				{#if !isPaused}
					<span class="h-1.5 w-1.5 rounded-full bg-volt" aria-hidden="true"></span>
				{/if}
				some favourites
			</span>
			<button
				onclick={() => (open = !open)}
				aria-label={open ? 'Minimize player' : 'Expand player'}
				aria-expanded={open}
				class="text-dim transition-colors hover:text-fog"
			>
				<svg
					class="h-4 w-4 transition-transform duration-300 {open ? '' : 'rotate-180'}"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		</div>

		<!-- Body collapses via max-height so the embed stays mounted and keeps playing -->
		<div
			class="overflow-hidden transition-all duration-300"
			style:max-height={open ? '200px' : '0px'}
			style:opacity={open ? '1' : '0'}
		>
			<div class="px-3 pb-3">
				<!-- Spotify embed = the player (album art + play/pause + scrubber) -->
				<div class="spotify-embed overflow-hidden rounded-lg">
					<div bind:this={embedTarget}></div>
				</div>

				<!-- Skip controls -->
				<div class="mt-2 flex items-center justify-center gap-8">
					<button
						onclick={() => playIndex(current - 1)}
						aria-label="Previous track"
						class="text-dim transition-colors hover:text-fog"
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M6 5v14M20 5v14L9 12z"
								stroke="currentColor"
								stroke-width="2"
								fill="currentColor"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					<button
						onclick={() => playIndex(current + 1)}
						aria-label="Next track"
						class="text-dim transition-colors hover:text-fog"
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M18 5v14M4 5v14l11-7z"
								stroke="currentColor"
								stroke-width="2"
								fill="currentColor"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* createController replaces the target with an <iframe>; make it fill the widget. */
	.spotify-embed :global(iframe) {
		width: 100%;
		border: 0;
	}
</style>

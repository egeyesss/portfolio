<script lang="ts">
	import { buildScene, INNER, SCENE_H, SCENE_W, type Block } from '$lib/voxel/scene';

	// Deterministic, so the markup is identical on the server and the client.
	const scene = buildScene();
	// Just enough darkening under the terrain that the blocks read on any photo.
	const fadeHeight = 160;
</script>

{#snippet voxel(b: Block)}
	<rect x={b.x} y={b.y} width={b.s} height={b.s} fill={b.fill} />
	{#if b.cap}
		<rect x={b.x} y={b.y} width={b.s} height={b.s * 0.3} fill={b.cap} />
	{/if}
	<rect x={b.x} y={b.y} width={b.s} height={b.s} fill="url(#vf-shade)" />
{/snippet}

<svg
	class="pointer-events-none absolute inset-0 h-full w-full"
	viewBox="0 0 {SCENE_W} {SCENE_H}"
	shape-rendering="crispEdges"
	aria-hidden="true"
	focusable="false"
>
	<defs>
		<!-- One gradient gives every block its top highlight and bottom shadow -->
		<linearGradient id="vf-shade" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#fff" stop-opacity="0.16" />
			<stop offset="0.18" stop-color="#fff" stop-opacity="0" />
			<stop offset="0.78" stop-color="#000" stop-opacity="0" />
			<stop offset="1" stop-color="#000" stop-opacity="0.28" />
		</linearGradient>

		<linearGradient id="vf-fade" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#000" stop-opacity="0" />
			<stop offset="1" stop-color="#000" stop-opacity="0.42" />
		</linearGradient>

		<pattern id="vf-plank" width="32" height="16" patternUnits="userSpaceOnUse">
			<rect width="32" height="16" fill="#8b6539" />
			<rect width="32" height="2" fill="#fff" fill-opacity="0.1" />
			<rect y="14" width="32" height="2" fill="#000" fill-opacity="0.24" />
			<rect x="15" width="2" height="16" fill="#000" fill-opacity="0.14" />
		</pattern>

		<clipPath id="vf-clip">
			<rect x={INNER.x} y={INNER.y} width={INNER.w} height={INNER.h} />
		</clipPath>
	</defs>

	<!-- Plank frame: four strips, so the corners meet like real blocks -->
	<g>
		<rect x="0" y="0" width={SCENE_W} height={INNER.y} fill="url(#vf-plank)" />
		<rect x="0" y={INNER.y + INNER.h} width={SCENE_W} height={INNER.y} fill="url(#vf-plank)" />
		<rect x="0" y={INNER.y} width={INNER.x} height={INNER.h} fill="url(#vf-plank)" />
		<rect
			x={INNER.x + INNER.w}
			y={INNER.y}
			width={INNER.x}
			height={INNER.h}
			fill="url(#vf-plank)"
		/>
		<rect
			x={INNER.x - 1}
			y={INNER.y - 1}
			width={INNER.w + 2}
			height={INNER.h + 2}
			fill="none"
			stroke="#000"
			stroke-opacity="0.45"
			stroke-width="2"
		/>
	</g>

	<!-- Everything below is clipped to the photo, so nothing spills onto the frame -->
	<g clip-path="url(#vf-clip)">
		<rect
			x={INNER.x}
			y={INNER.y + INNER.h - fadeHeight}
			width={INNER.w}
			height={fadeHeight}
			fill="url(#vf-fade)"
		/>

		{#each scene.groups as group, i (i)}
			<g transform="translate({group.x} {group.y})">
				<g class={group.anim}>
					{#each group.blocks as b, j (j)}
						{@render voxel(b)}
					{/each}
				</g>
			</g>
		{/each}

		{#each scene.petals as p, i (i)}
			<rect
				class="petal"
				x={p.x}
				y={p.y}
				width={p.s}
				height={p.s}
				fill={p.fill}
				style="--dur:{p.dur}s; --delay:{p.delay}s; --drift:{p.drift}px; --fall:{p.fall}px"
			/>
		{/each}
	</g>
</svg>

<style>
	/* Reduced motion gets the same diorama, just standing still. */
	.petal {
		opacity: 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.sway,
		.swaySlow {
			transform-box: fill-box;
			transform-origin: 50% 100%;
		}

		.sway {
			animation: vf-sway 6.5s ease-in-out infinite;
		}

		.swaySlow {
			animation: vf-sway-slow 8.5s ease-in-out infinite;
		}

		.flicker {
			animation: vf-flicker 1.6s ease-in-out infinite;
		}

		.petal {
			transform-box: fill-box;
			transform-origin: 50% 50%;
			animation: vf-fall var(--dur) linear var(--delay) infinite;
		}
	}

	@keyframes vf-sway {
		0%,
		100% {
			transform: rotate(-1.3deg);
		}
		50% {
			transform: rotate(1.3deg);
		}
	}

	@keyframes vf-sway-slow {
		0%,
		100% {
			transform: rotate(-0.7deg);
		}
		50% {
			transform: rotate(0.7deg);
		}
	}

	@keyframes vf-flicker {
		0%,
		100% {
			opacity: 0.82;
		}
		50% {
			opacity: 1;
		}
	}

	@keyframes vf-fall {
		0% {
			transform: translate(0, 0) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 0.95;
		}
		85% {
			opacity: 0.85;
		}
		100% {
			transform: translate(var(--drift), var(--fall)) rotate(220deg);
			opacity: 0;
		}
	}
</style>

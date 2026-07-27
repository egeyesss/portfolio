<script lang="ts">
	import { entrance } from '$lib/state/entrance.svelte';

	// a spray can paints the logo onto a dark window, then the window slides
	// up to reveal the page. Slightly shorter than the original 4s default,
	// since recruiters give a portfolio well under a minute total.
	const DURATION = 3.4;
	const INTRO_END = 0.45;
	const PAINT_END = DURATION - 0.95;
	const SLIDE_START = DURATION - 0.45;
	const END = DURATION + 0.15;
	// Peak gain of the spray hiss (~60% as requested).
	const SPRAY_VOLUME = 0.6;

	let winEl: HTMLDivElement | undefined = $state();
	let logoEl: HTMLImageElement | undefined = $state();
	let canEl: HTMLImageElement | undefined = $state();
	let dustEl: HTMLDivElement | undefined = $state();
	let sp1El: HTMLDivElement | undefined = $state();
	let sp2El: HTMLDivElement | undefined = $state();
	let sp3El: HTMLDivElement | undefined = $state();
	let hidden = $state(false);

	const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
	const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
	const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

	$effect(() => {
		// Plays on every load by design; reduced-motion users still skip it.
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced || !winEl || !logoEl || !canEl || !dustEl) {
			hidden = true;
			entrance.done = true;
			return;
		}

		const win = winEl;
		const logo = logoEl;
		const can = canEl;
		const dust = dustEl;
		const splatters = [sp1El, sp2El, sp3El];

		document.body.style.overflow = 'hidden';

		// Spray-hiss: looped bandpassed noise, gain driven from the rAF loop.
		// Browsers keep the AudioContext suspended until the user has interacted
		// with the page, so try to resume immediately (works on revisits once the
		// browser trusts the origin) and also unlock on any gesture. A silent
		// first-ever visit is a browser guarantee we can't code around.
		let ctx: AudioContext | undefined;
		let hissGain: GainNode | undefined;
		try {
			ctx = new AudioContext();
			const len = Math.floor(ctx.sampleRate * 2);
			const buf = ctx.createBuffer(1, len, ctx.sampleRate);
			const data = buf.getChannelData(0);
			for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
			const src = ctx.createBufferSource();
			src.buffer = buf;
			src.loop = true;
			const bp = ctx.createBiquadFilter();
			bp.type = 'bandpass';
			bp.frequency.value = 4800;
			bp.Q.value = 0.8;
			const hp = ctx.createBiquadFilter();
			hp.type = 'highpass';
			hp.frequency.value = 1800;
			const gain = ctx.createGain();
			gain.gain.value = 0;
			src.connect(bp);
			bp.connect(hp);
			hp.connect(gain);
			gain.connect(ctx.destination);
			src.start();
			hissGain = gain;
			if (ctx.state === 'suspended') {
				void ctx.resume();
				const resume = () => {
					void ctx?.resume();
					window.removeEventListener('pointerdown', resume);
					window.removeEventListener('keydown', resume);
				};
				window.addEventListener('pointerdown', resume);
				window.addEventListener('keydown', resume);
			}
		} catch {
			// no audio is fine
		}

		let t0 = performance.now();
		let raf = 0;
		let finished = false;

		// Sweep path: cap the stroke to the logo box (35vmin, max 360px)
		const paintPoint = (p: number, W: number, H: number) => {
			const S = Math.min(Math.min(W, H) * 0.35, 360);
			const bx = (W - S) / 2;
			return { x: bx + S * p, y: H / 2 + S * 0.32 * Math.sin(p * Math.PI * 9) };
		};

		const finish = () => {
			if (finished) return;
			finished = true;
			document.body.style.overflow = '';
			entrance.done = true;
			hidden = true;
		};

		const skip = () => {
			// Fast-forward to the slide phase rather than cutting to black
			const e = (performance.now() - t0) / 1000;
			if (e < SLIDE_START) t0 = performance.now() - SLIDE_START * 1000;
		};
		win.addEventListener('pointerdown', skip);
		const onKey = (ev: KeyboardEvent) => {
			if (ev.key === 'Escape' || ev.key === 'Enter' || ev.key === ' ') skip();
		};
		window.addEventListener('keydown', onKey);

		const loop = (now: number) => {
			const e = (now - t0) / 1000;
			const rect = win.getBoundingClientRect();
			const W = rect.width;
			const H = rect.height;
			const canW = Math.min(W, H) * 0.15;
			const ox = 0.66 * canW;
			const oy = 0.16 * canW;

			let p: number;
			if (e < INTRO_END) p = 0;
			else if (e > PAINT_END) p = 1;
			else p = clamp((e - INTRO_END) / (PAINT_END - INTRO_END));

			// masked sweep reveal of the logo
			const x = p * 112 - 6;
			const mask = `linear-gradient(100deg, #000 ${x}%, rgba(0,0,0,0) ${x + 7}%)`;
			logo.style.webkitMaskImage = mask;
			logo.style.maskImage = mask;
			logo.style.filter = p >= 1 ? 'drop-shadow(0 0 22px rgba(243,230,0,0.35))' : 'none';

			// overspray splatter fades in near the end
			const spo = clamp((p - 0.65) / 0.35) * 0.55;
			for (const s of splatters) if (s) s.style.opacity = String(spo);

			// can position: fly in from below, follow the stroke, exit left
			const pp = paintPoint(p, W, H);
			let cx: number;
			let cy: number;
			let spraying = false;
			if (e < INTRO_END) {
				const fi = easeOut(clamp(e / INTRO_END));
				const start = { x: (W - Math.min(W, H) * 0.35) / 2 + 30, y: H + canW * 0.4 };
				const tgt = paintPoint(0, W, H);
				cx = start.x + (tgt.x - ox - start.x) * fi;
				cy = start.y + (tgt.y - oy - start.y) * fi;
			} else if (e <= PAINT_END) {
				cx = pp.x - ox;
				cy = pp.y - oy;
				spraying = true;
			} else {
				const ff = easeInOut(clamp((e - PAINT_END) / (SLIDE_START - PAINT_END)));
				const from = paintPoint(1, W, H);
				cx = from.x - ox + (-canW * 1.2 - (from.x - ox)) * ff;
				cy = from.y - oy + (H + canW * 0.4 - (from.y - oy)) * ff;
			}
			can.style.width = `${canW}px`;
			can.style.transform = `translate(${cx}px, ${cy}px) rotate(${6 * Math.sin(e * 7)}deg)`;

			// nozzle dust glow
			const dW = dust.offsetWidth || Math.min(W, H) * 0.14;
			if (spraying) {
				const flick = 0.55 + 0.45 * Math.abs(Math.sin(e * 22));
				dust.style.opacity = String(0.9 * flick);
				dust.style.transform = `translate(${pp.x - dW / 2}px, ${pp.y - dW / 2}px) scale(${0.85 + 0.25 * flick})`;
			} else {
				dust.style.opacity = '0';
			}

			if (hissGain) {
				const target = spraying ? SPRAY_VOLUME * (0.55 + 0.45 * Math.abs(Math.sin(e * 20))) : 0;
				hissGain.gain.value += (target - hissGain.gain.value) * 0.25;
			}

			// window slides up; page (and hero intro) revealed underneath
			if (e > SLIDE_START) {
				entrance.done = true;
				const sp = easeInOut(clamp((e - SLIDE_START) / (DURATION - SLIDE_START)));
				win.style.transform = `translateY(${-112 * sp}%)`;
			} else {
				win.style.transform = 'translateY(0)';
			}

			if (e < END) raf = requestAnimationFrame(loop);
			else finish();
		};
		raf = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(raf);
			win.removeEventListener('pointerdown', skip);
			window.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
			try {
				if (hissGain) hissGain.gain.value = 0;
				void ctx?.close();
			} catch {
				// already closed
			}
		};
	});
</script>

{#if !hidden}
	<div
		bind:this={winEl}
		class="entrance fixed inset-0 z-60 overflow-hidden will-change-transform"
		style="background: radial-gradient(125% 120% at 30% 18%, #191a1d 0%, #0a0a0b 52%, #010101 100%); box-shadow: inset 0 0 140px 20px rgb(0 0 0 / 0.9);"
		aria-hidden="true"
	>
		<!-- subtle glossy sheen sweep -->
		<div class="sheen pointer-events-none absolute top-[-30%] left-0 h-[160%] w-[55%]"></div>
		<!-- top edge highlight -->
		<div
			class="pointer-events-none absolute top-0 right-0 left-0 h-0.5"
			style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);"
		></div>

		<!-- logo reveal box -->
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<div class="relative" style="width:35vmin; height:35vmin; max-width:360px; max-height:360px;">
				<div
					bind:this={sp1El}
					class="splatter"
					style="left:8%; top:30%; width:22%; height:22%; filter:blur(9px);"
				></div>
				<div
					bind:this={sp2El}
					class="splatter"
					style="right:6%; top:22%; width:26%; height:26%; filter:blur(11px);"
				></div>
				<div
					bind:this={sp3El}
					class="splatter"
					style="left:36%; bottom:8%; width:30%; height:24%; filter:blur(12px); border-radius:50%;"
				></div>
				<img
					bind:this={logoEl}
					src="/logo.jpg"
					alt=""
					class="absolute inset-0 h-full w-full object-contain"
					style="mix-blend-mode:screen; -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat; -webkit-mask-size:100% 100%; mask-size:100% 100%; -webkit-mask-image:linear-gradient(100deg, #000 -6%, rgba(0,0,0,0) 1%); mask-image:linear-gradient(100deg, #000 -6%, rgba(0,0,0,0) 1%);"
				/>
			</div>
		</div>

		<!-- fresh-paint dust glow at the nozzle -->
		<div
			bind:this={dustEl}
			class="pointer-events-none absolute top-0 left-0 rounded-full opacity-0"
			style="width:7vmin; height:7vmin; background:radial-gradient(circle, rgba(243,230,0,0.85), rgba(243,230,0,0.15) 45%, transparent 72%); filter:blur(4px); mix-blend-mode:screen;"
		></div>

		<!-- spray can -->
		<img
			bind:this={canEl}
			src="/spraycan.png"
			alt=""
			class="pointer-events-none absolute top-0 left-0 will-change-transform"
			style="width:30vmin; transform:translate(-200px,-200px); filter:drop-shadow(0 18px 24px rgba(0,0,0,0.55));"
		/>

		<!-- recruiters shouldn't have to guess they can skip -->
		<p
			class="skip-hint pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-xs tracking-[0.2em] text-dim uppercase"
		>
			Click or press Esc to skip
		</p>
	</div>
	<noscript>
		<style>
			.entrance {
				display: none;
			}
		</style>
	</noscript>
{/if}

<style>
	@keyframes sheen-sweep {
		0% {
			transform: translateX(-120%) rotate(8deg);
		}
		55%,
		100% {
			transform: translateX(120%) rotate(8deg);
		}
	}
	.sheen {
		background: linear-gradient(
			115deg,
			transparent 40%,
			rgba(255, 255, 255, 0.055) 50%,
			transparent 60%
		);
		animation: sheen-sweep 7s ease-in-out infinite;
	}
	.splatter {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(243, 230, 0, 0.5), transparent 70%);
		mix-blend-mode: screen;
		opacity: 0;
	}
	@keyframes hint-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.8;
		}
	}
	.skip-hint {
		opacity: 0;
		animation: hint-in 0.5s ease-out 0.9s forwards;
	}
</style>

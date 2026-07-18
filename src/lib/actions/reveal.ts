import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let pluginRegistered = false;

export interface RevealOptions {
	y?: number;
	delay?: number;
}

/**
 * Scroll-triggered entrance animation. Wrapped in gsap.matchMedia so users
 * with prefers-reduced-motion get static, fully visible content — gsap.from
 * never hides the element for them.
 */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	if (!pluginRegistered) {
		gsap.registerPlugin(ScrollTrigger);
		pluginRegistered = true;
	}

	const mm = gsap.matchMedia();
	mm.add('(prefers-reduced-motion: no-preference)', () => {
		gsap.from(node, {
			y: options.y ?? 40,
			autoAlpha: 0,
			duration: 0.8,
			delay: options.delay ?? 0,
			ease: 'power3.out',
			scrollTrigger: { trigger: node, start: 'top 85%', once: true }
		});
	});

	return {
		destroy() {
			mm.revert();
		}
	};
}

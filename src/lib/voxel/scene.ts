/**
 * Geometry for the voxel diorama that sits inside the hero photo frame.
 *
 * Everything is laid out in a fixed 400x500 coordinate space (the 4:5 photo
 * ratio) and rendered as an SVG, so the scene scales with the frame without
 * needing to measure anything at runtime. Block positions come from a seeded
 * PRNG rather than Math.random so SSR and hydration produce identical markup.
 */

export const SCENE_W = 400;
export const SCENE_H = 500;
export const BLOCK = 16;

/** Plank border thickness. The diorama is confined to the area inside it. */
export const FRAME = BLOCK;

export const INNER = {
	x: FRAME,
	y: FRAME,
	w: SCENE_W - FRAME * 2, // 368
	h: SCENE_H - FRAME * 2 // 468
};

const COLS = INNER.w / BLOCK; // 23
const BASE_Y = INNER.y + INNER.h; // ground line, flush with the frame's inner edge

/** Muted takes on the Minecraft palette so they read on the ink background. */
export const COLORS = {
	grass: '#7cb34f',
	grassAlt: '#6ea447',
	dirt: '#6b4f33',
	dirtAlt: '#5e452d',
	stone: '#7f8285',
	stoneAlt: '#8d9093',
	stoneDark: '#6e7174',
	oakLog: '#6d5030',
	oakLeaf: '#43862f',
	oakLeafAlt: '#3a752a',
	cherryLog: '#5d4234',
	cherryLeaf: '#e08bb6',
	cherryLeafAlt: '#cf7aa6',
	cherryPetal: '#f0a9cb',
	water: '#35659f',
	waterAlt: '#3f74b4',
	waterTop: '#4d86c6',
	plank: '#8b6539',
	torch: '#3b2c1b',
	flame: '#ffd166',
	flameCore: '#ffe9a8',
	flowerRed: '#c9524e',
	flowerGold: '#d9b24a',
	stem: '#3f7a2c'
} as const;

export type Anim = 'none' | 'sway' | 'swaySlow' | 'flicker';

export interface Block {
	x: number;
	y: number;
	s: number;
	fill: string;
	/** Optional grass-style cap drawn over the top of the block. */
	cap?: string;
}

export interface Group {
	x: number;
	y: number;
	anim: Anim;
	blocks: Block[];
}

export interface Petal {
	x: number;
	y: number;
	s: number;
	fill: string;
	/** Animation duration and start offset, in seconds. */
	dur: number;
	delay: number;
	/** Horizontal drift and vertical travel over the fall, in scene units. */
	drift: number;
	fall: number;
}

export interface Scene {
	groups: Group[];
	petals: Petal[];
}

/** Column layout: stone outcrop left, oak left, pond centre, cherry right. */
const STONE_COLS = 2;
const OAK_COL = 3;
const CHERRY_COL = 19;
// Pond sits left of centre so it never lands behind the subject's face or torso.
const POOL_COLS = [6, 7, 8, 9];
const FLOWER_COLS = [4, 12, 16];
/** Extra height added at each edge so the ground climbs into a valley. */
const EDGE_LIFT = [4, 3, 2, 1];

function lcg(seed: number) {
	let s = seed >>> 0;
	return () => {
		s = (s * 1664525 + 1013904223) >>> 0;
		return s / 4294967296;
	};
}

function edgeLift(col: number) {
	if (col < EDGE_LIFT.length) return EDGE_LIFT[col];
	if (col >= COLS - EDGE_LIFT.length) return EDGE_LIFT[COLS - 1 - col];
	return 0;
}

function block(x: number, y: number, s: number, fill: string, cap?: string): Block {
	return { x, y, s, fill, cap };
}

function terrainHeights(rand: () => number) {
	const heights: number[] = [];
	let h = 3;
	for (let col = 0; col < COLS; col++) {
		const roll = rand();
		if (roll < 0.3) h -= 1;
		else if (roll > 0.72) h += 1;
		h = Math.min(4, Math.max(2, h));
		heights.push(h + edgeLift(col));
	}

	// Carve the pond a block below its banks so it reads as a dip, not a blue patch.
	for (const col of POOL_COLS) heights[col] = 3;
	for (const col of [POOL_COLS[0] - 1, POOL_COLS[POOL_COLS.length - 1] + 1]) {
		heights[col] = Math.max(heights[col], 4);
	}
	return heights;
}

function terrainBlocks(heights: number[], rand: () => number) {
	const blocks: Block[] = [];
	for (let col = 0; col < COLS; col++) {
		const height = heights[col];
		const isStone = col < STONE_COLS;
		const isPool = POOL_COLS.includes(col);
		const x = INNER.x + col * BLOCK;

		for (let row = 0; row < height; row++) {
			const y = BASE_Y - (row + 1) * BLOCK;
			const isTop = row === height - 1;

			if (isPool && row >= height - 2) {
				const fill = rand() < 0.5 ? COLORS.water : COLORS.waterAlt;
				// Lighter cap on the surface row so the pond reads as water, not a slab.
				blocks.push(block(x, y, BLOCK, fill, isTop ? COLORS.waterTop : undefined));
			} else if (isTop && isStone) {
				// Mossy outcrop: some stone tops still catch grass.
				blocks.push(block(x, y, BLOCK, COLORS.stone, rand() < 0.45 ? COLORS.grass : undefined));
			} else if (isTop) {
				const cap = rand() < 0.5 ? COLORS.grass : COLORS.grassAlt;
				blocks.push(block(x, y, BLOCK, rand() < 0.5 ? COLORS.dirt : COLORS.dirtAlt, cap));
			} else if (isStone || row < height - 3) {
				const roll = rand();
				const fill = roll < 0.4 ? COLORS.stone : roll < 0.75 ? COLORS.stoneAlt : COLORS.stoneDark;
				blocks.push(block(x, y, BLOCK, fill));
			} else {
				blocks.push(block(x, y, BLOCK, rand() < 0.5 ? COLORS.dirt : COLORS.dirtAlt));
			}
		}
	}
	return blocks;
}

const CANOPY = {
	oak: [' xxx ', 'xxxxx', 'xxxxx', ' xxx '],
	cherry: [' xxx ', 'xxxxx', 'xxxxx', ' x x ']
} as const;

interface Tree {
	trunk: Block[];
	canopy: Group;
	/** Canopy centre, used as the petal source. */
	cx: number;
	cy: number;
}

function buildTree(kind: 'oak' | 'cherry', col: number, heights: number[], seed: number): Tree {
	const rand = lcg(seed);
	const groundTop = BASE_Y - heights[col] * BLOCK;
	const trunkHeight = kind === 'oak' ? 4 : 5;
	const logFill = kind === 'oak' ? COLORS.oakLog : COLORS.cherryLog;

	const trunk: Block[] = [];
	for (let i = 0; i < trunkHeight; i++) {
		trunk.push(block(INNER.x + col * BLOCK, groundTop - (i + 1) * BLOCK, BLOCK, logFill));
	}

	const pattern = CANOPY[kind];
	const rows = pattern.length;
	// Canopy is 5 wide, centred on the trunk, and overlaps its top two blocks.
	const gx = INNER.x + (col - 2) * BLOCK;
	const gy = groundTop - trunkHeight * BLOCK - (rows - 2) * BLOCK;

	const leaves: Block[] = [];
	for (let row = 0; row < rows; row++) {
		for (let cell = 0; cell < pattern[row].length; cell++) {
			if (pattern[row][cell] !== 'x') continue;
			// Leave the bottom-centre open so the trunk shows through.
			if (row === rows - 1 && cell === 2) continue;
			const leaf =
				kind === 'oak'
					? rand() < 0.5
						? COLORS.oakLeaf
						: COLORS.oakLeafAlt
					: rand() < 0.5
						? COLORS.cherryLeaf
						: COLORS.cherryLeafAlt;
			leaves.push(block(cell * BLOCK, row * BLOCK, BLOCK, leaf));
		}
	}

	return {
		trunk,
		canopy: { x: gx, y: gy, anim: kind === 'oak' ? 'sway' : 'swaySlow', blocks: leaves },
		cx: gx + 2.5 * BLOCK,
		cy: gy + rows * BLOCK
	};
}

function flowers(heights: number[], rand: () => number) {
	const blocks: Block[] = [];
	for (const col of FLOWER_COLS) {
		const top = BASE_Y - heights[col] * BLOCK;
		const x = INNER.x + col * BLOCK;
		blocks.push(block(x + BLOCK * 0.375, top - BLOCK * 0.25, BLOCK * 0.25, COLORS.stem));
		blocks.push(
			block(
				x + BLOCK * 0.3125,
				top - BLOCK * 0.625,
				BLOCK * 0.375,
				rand() < 0.5 ? COLORS.flowerRed : COLORS.flowerGold
			)
		);
	}
	return blocks;
}

function torch(col: number, heights: number[]): Group {
	const top = BASE_Y - heights[col] * BLOCK;
	const s = BLOCK * 0.5;
	return {
		x: INNER.x + col * BLOCK + BLOCK * 0.25,
		y: top - BLOCK * 2.25,
		anim: 'flicker',
		blocks: [
			// stick, then the flame stacked on top
			block(0, s * 2, s, COLORS.torch),
			block(0, s * 3, s, COLORS.torch),
			block(0, s * 4, s, COLORS.torch),
			block(-s * 0.25, s, s * 1.5, COLORS.flame),
			block(s * 0.15, s * 0.35, s * 0.7, COLORS.flameCore)
		]
	};
}

function buildPetals(count: number, source: Tree, rand: () => number): Petal[] {
	const petals: Petal[] = [];
	const spread = BLOCK * 6;
	for (let i = 0; i < count; i++) {
		const x = source.cx - spread * 0.65 + rand() * spread;
		const y = source.cy - BLOCK * 3 - rand() * BLOCK * 3;
		petals.push({
			x: Math.round(Math.min(Math.max(x, INNER.x), INNER.x + INNER.w - BLOCK)),
			y: Math.round(y),
			s: rand() < 0.5 ? 6 : 4,
			fill: rand() < 0.5 ? COLORS.cherryLeaf : COLORS.cherryPetal,
			dur: Number((5 + rand() * 5).toFixed(1)),
			delay: Number((rand() * 9).toFixed(1)),
			drift: Math.round(BLOCK + rand() * BLOCK * 2.5),
			fall: Math.round(BASE_Y - y + BLOCK)
		});
	}
	return petals;
}

/**
 * Builds the full scene. `petalCount` is the only knob worth turning; the rest
 * of the layout is fixed so the trees always frame the photo the same way.
 */
export function buildScene(petalCount = 14): Scene {
	const rand = lcg(20260726);
	const heights = terrainHeights(rand);
	const ground = terrainBlocks(heights, rand);
	const oak = buildTree('oak', OAK_COL, heights, 87);
	const cherry = buildTree('cherry', CHERRY_COL, heights, 91);

	const groups: Group[] = [
		{
			x: 0,
			y: 0,
			anim: 'none',
			blocks: [...ground, ...oak.trunk, ...cherry.trunk, ...flowers(heights, rand)]
		},
		// Far-left column only: anywhere else the oak canopy would cover it.
		torch(0, heights),
		oak.canopy,
		cherry.canopy
	];

	return { groups, petals: buildPetals(petalCount, cherry, rand) };
}

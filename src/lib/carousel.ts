/**
 * Offset bookkeeping for the looping project rail.
 *
 * The rail lays COPIES identical copies of the project list end to end and
 * scrolls one offset across them, so the seam is never visible. The offset is
 * kept inside copy index 1, which leaves a whole copy of track on either side:
 * a drift tick or an arrow step can overshoot in either direction and still
 * land on real content before the next wrap pulls it back.
 */
export const COPIES = 4;

/** The copy the offset is normalized back into. */
const HOME = 1;

/**
 * Fold an offset back into the home copy. Offsets one setWidth apart render
 * identical content, so this jump is invisible.
 */
export function wrapOffset(offset: number, setWidth: number): number {
	if (!Number.isFinite(offset) || setWidth <= 0) return offset;
	const low = HOME * setWidth;
	return low + ((((offset - low) % setWidth) + setWidth) % setWidth);
}

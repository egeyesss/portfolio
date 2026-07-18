// Shared flag so the hero intro waits for the entrance window to lift.
// Set true the moment the window starts sliding (or immediately when the
// entrance is skipped), so the hero animates into view as the page reveals.
export const entrance = $state({ done: false });

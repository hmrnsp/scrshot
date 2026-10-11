// Shared state for the product demo, so the feature cards further down the
// page can switch what the laptop is showing.
export const demo = $state({ active: 0, playing: true });

export function showFeature(i) {
	demo.active = i;
	demo.playing = true;
}

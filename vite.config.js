import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter({
				out: 'build',
				precompress: true
			}),
			paths: {
				// Trusted origin for CSRF checks and prerendering; replaces the ORIGIN env var from Kit 2.
				origin: 'https://screenshot.id'
			},
			prerender: {
				handleHttpError: ({ path, message }) => {
					// External links are not crawled; fail the build on any broken internal link.
					throw new Error(`${path}: ${message}`);
				}
			}
		})
	]
});

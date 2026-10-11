import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: true,
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, message }) => {
				// External links are not crawled; fail the build on any broken internal link.
				throw new Error(`${path}: ${message}`);
			}
		}
	}
};

export default config;

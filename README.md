# scrshot website

The landing page for **scrshot**, the free and open-source AI-powered screenshot launcher, served at [screenshot.id](https://screenshot.id).

Built with [SvelteKit](https://svelte.dev/docs/kit) and Svelte 5, and prerendered to static HTML with `@sveltejs/adapter-static`, so it can be hosted on any static host.

## Pages

| Route      | Source                            |
| ---------- | --------------------------------- |
| `/`        | `src/routes/+page.svelte`         |
| `/privacy` | `src/routes/privacy/+page.svelte` |
| `/terms`   | `src/routes/terms/+page.svelte`   |

The animated laptop demo lives in `src/lib/components/demo/`. Each feature's content (window, annotations, launcher actions and result) is defined in `src/lib/features.js`, and shared links (GitHub repo, releases, issues) in `src/lib/site.js`.

## Development

Requires Node.js 20 or newer.

```sh
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run check     # svelte-check
npm run build     # prerender the site into ./build
npm run preview   # serve the production build locally
```

## Deployment

`npm run build` writes a fully static site to `build/`, including precompressed `.br` and `.gz` files. Deploy that folder to any static host (Cloudflare Pages, Netlify, Vercel, GitHub Pages, Nginx). Pages are emitted as `privacy.html` and `terms.html`, so the host should serve `/privacy` from `privacy.html`. Cloudflare Pages, Netlify and Vercel do this by default.

Fonts (Inter and JetBrains Mono) are bundled from `@fontsource`, so the site makes no third-party requests and sets no cookies.

## License

[MIT](LICENSE) © 2026 scrshot contributors

## Accessibility

- The demo respects `prefers-reduced-motion`. It shows the finished state instead of animating.
- The demo can be paused, and each step (Capture, Annotate, AI Actions, Result) can be selected directly.
- The laptop illustration is hidden from screen readers. Its current step is announced through a live caption.

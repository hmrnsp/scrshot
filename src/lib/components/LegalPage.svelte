<script>
	import SiteHeader from './SiteHeader.svelte';
	import SiteFooter from './SiteFooter.svelte';
	import { SITE } from '#lib/site.js';

	let { title, description, path, updated, children } = $props();
</script>

<svelte:head>
	<title>{title} · scrshot</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{SITE.url}{path}" />
	<meta property="og:title" content="{title} · scrshot" />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="{SITE.url}{path}" />
</svelte:head>

<SiteHeader home={false} />

<main id="main" class="legal">
	<article>
		<p class="eyebrow">LEGAL</p>
		<h1>{title}</h1>
		<p class="updated">Last updated: {updated}</p>
		{@render children()}
	</article>
</main>

<SiteFooter home={false} />

<style>
	.legal {
		padding: 64px var(--gutter) 104px;
	}
	article {
		max-width: 760px;
		margin: 0 auto;
	}
	h1 {
		margin: 12px 0 0;
		font-size: clamp(36px, 5vw, 56px);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1.05;
	}
	.updated {
		margin: 16px 0 0;
		color: var(--muted);
		font-size: 15px;
	}
	article :global(h2) {
		margin: 44px 0 0;
		font-size: 22px;
		font-weight: 700;
		letter-spacing: -0.01em;
	}
	article :global(p),
	article :global(li) {
		font-size: 16.5px;
		line-height: 1.7;
		color: var(--body);
	}
	article :global(p) {
		margin: 12px 0 0;
	}
	article :global(ul) {
		margin: 12px 0 0;
		padding-left: 22px;
	}
	article :global(li) {
		margin-top: 6px;
	}
	article :global(a) {
		color: var(--ink);
		text-underline-offset: 3px;
	}
</style>

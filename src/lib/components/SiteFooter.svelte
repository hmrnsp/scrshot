<script>
	import Logo from './Logo.svelte';
	import { SITE } from '$lib/site.js';

	let { home = true } = $props();
	const prefix = $derived(home ? '' : '/');
</script>

<footer class="footer">
	<div class="container">
		<div class="cols">
			<div class="about">
				<a class="brand" href="/"><Logo size={22} />scrshot</a>
				<p>The free, open-source AI screenshot launcher for macOS and Windows.</p>
			</div>
			<nav aria-label="Product">
				<h2>Product</h2>
				<a href="{prefix}#features">Features</a>
				<a href="{prefix}#pricing">Pricing</a>
				<a href="{prefix}#download">Download</a>
				<a href="{prefix}#faq">FAQ</a>
			</nav>
			<nav aria-label="Open source">
				<h2>Open source</h2>
				<a href={SITE.repo} rel="noopener">Source code</a>
				<a href={SITE.issues} rel="noopener">Report an issue</a>
				<a href={SITE.releases} rel="noopener">Releases</a>
				<a href={SITE.license} rel="noopener">License</a>
			</nav>
			<nav aria-label="Legal">
				<h2>Legal</h2>
				<a href="/privacy">Privacy Policy</a>
				<a href="/terms">Terms of Use</a>
				<a href="{prefix}#security">Security</a>
			</nav>
		</div>
		<div class="bottom">
			<span>© 2026 scrshot contributors. Free and open-source software.</span>
			<span>{SITE.domain}</span>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--ink);
		border-top: 1px solid #1f272f;
		padding: 56px var(--gutter) 32px;
		color: var(--dark-muted);
	}
	.cols {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 40px 56px;
	}
	.about {
		flex: 1 1 240px;
		min-width: 0;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-size: 20px;
		font-weight: 800;
		color: var(--ground);
		text-decoration: none;
	}
	.about p {
		margin: 12px 0 0;
		max-width: 280px;
		font-size: 14.5px;
		line-height: 1.6;
	}
	nav {
		flex: 0 1 160px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 14.5px;
	}
	h2 {
		margin: 0 0 6px;
		font-size: 14.5px;
		font-weight: 600;
		color: var(--ground);
	}
	nav a {
		padding: 6px 0;
		color: var(--dark-text);
		text-decoration: none;
	}
	nav a:hover {
		color: #fff;
	}
	.bottom {
		margin-top: 48px;
		padding-top: 20px;
		border-top: 1px solid #1f272f;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px 24px;
		font-size: 13.5px;
	}
</style>

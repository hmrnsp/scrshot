<script>
	import Logo from './Logo.svelte';
	import { SITE } from '$lib/site.js';

	let { home = true } = $props();
	const prefix = $derived(home ? '' : '/');
</script>

<header class="header">
	<nav class="nav container" aria-label="Main">
		<a class="brand" href="/" aria-label="scrshot home"><Logo />scrshot</a>
		<div class="links">
			<a class="link" href="{prefix}#features">Features</a>
			<a class="link" href="{prefix}#how">How it works</a>
			<a class="link" href="{prefix}#pricing">Pricing</a>
			<a class="link" href="{prefix}#security">Security</a>
			<a class="link" href={SITE.repo} rel="noopener">GitHub</a>
			<a class="cta" href="{prefix}#download">Download</a>
		</div>
	</nav>
</header>

<style>
	.header {
		background: var(--ink);
		padding: 0 var(--gutter);
	}
	.nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px 32px;
		padding: 24px 0;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 24px;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--ground);
		text-decoration: none;
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px 28px;
		font-size: 15px;
	}
	.link {
		padding: 12px 0;
		color: var(--dark-text);
		text-decoration: none;
	}
	.link:hover {
		color: #fff;
	}
	.cta {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 20px;
		border-radius: 999px;
		background: var(--accent);
		color: var(--ink);
		font-weight: 600;
		text-decoration: none;
	}
	@media (max-width: 760px) {
		.link {
			display: none;
		}
	}
</style>

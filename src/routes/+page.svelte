<script>
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import Logo from '#lib/components/Logo.svelte';
	import LaptopDemo from '#lib/components/demo/LaptopDemo.svelte';
	import { FEATURES } from '#lib/features.js';
	import { showFeature } from '#lib/demo.svelte.js';
	import { SITE } from '#lib/site.js';

	const FAQS = [
		{
			q: 'Is screenshotid really free?',
			a: 'Yes. screenshotid is free and open source, with no subscription and no account. AI actions run on your own API key, so any AI usage is billed directly by the provider you choose.'
		},
		{
			q: 'Which platforms does screenshotid support?',
			a: 'macOS and Windows. Installers for both are published on the GitHub Releases page, and the README lists the exact system requirements for each version.'
		},
		{
			q: 'How is it different from a regular screenshot tool?',
			a: 'Capture and annotation work like the tools you already know. screenshotid also recognizes what you captured and offers the next step, so you do not have to open another app and explain the context.'
		},
		{
			q: 'Are my screenshots sent to the cloud?',
			a: 'Only when you run an AI action. Capturing and annotating happen on your device. When you run an action, the capture goes directly from your device to the AI provider you configured. screenshotid has no servers that receive or store your captures.'
		},
		{
			q: 'Are my captures used to train AI models?',
			a: 'screenshotid never collects your captures, so we cannot train on them. How your AI provider handles API requests is set by that provider’s terms, so review them before you connect a key.'
		},
		{
			q: 'Which AI models power screenshotid?',
			a: 'You choose. Add an API key for a supported provider in Settings and screenshotid uses it for detection and actions. The current list of supported providers is in the README.'
		},
		{
			q: 'Does it work offline?',
			a: 'Capture, annotation, copy and save all work offline. AI actions need an internet connection to reach your AI provider.'
		},
		{
			q: 'Can I contribute?',
			a: 'Yes. Bug reports, feature ideas and pull requests are welcome on GitHub. Check the open issues to find a good place to start.'
		},
		{
			q: 'How do I report a security issue?',
			a: 'Please report it privately through GitHub’s “Report a vulnerability” form on the screenshotid repository instead of opening a public issue.'
		}
	];

	let openFaq = $state(0);

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'screenshotid',
		applicationCategory: 'UtilitiesApplication',
		operatingSystem: 'macOS, Windows',
		description: SITE.description,
		url: SITE.url,
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
	});
</script>

<svelte:head>
	<title>screenshotid — the screenshot tool that knows what to do next</title>
	<meta name="description" content={SITE.description} />
	<link rel="canonical" href="{SITE.url}/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="screenshotid" />
	<meta property="og:title" content="screenshotid — the screenshot tool that knows what to do next" />
	<meta property="og:description" content={SITE.description} />
	<meta property="og:url" content="{SITE.url}/" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="screenshotid — the screenshot tool that knows what to do next" />
	<meta name="twitter:description" content={SITE.description} />
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<SiteHeader />

<main id="main">
	<!-- HERO + DEMO -->
	<section id="product" class="hero">
		<div class="container">
			<div class="hero-copy">
				<p class="badge"><span class="badge-dot"></span>Free &amp; open source · AI screenshot launcher</p>
				<h1>The screenshot tool that knows what to do next.</h1>
				<p class="hero-lead">
					Capture, annotate, and act. screenshotid reads what's on your screen and offers the right action: debug an error,
					extract a table, turn a design into code, and more.
				</p>
				<div class="hero-ctas">
					<a class="btn btn-accent" href={SITE.releases} rel="noopener">
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v10M4.5 8 9 12.5 13.5 8M3 15.5h12" /></svg>
						Download for macOS
					</a>
					<a class="btn btn-ghost" href={SITE.releases} rel="noopener">Download for Windows</a>
				</div>
				<p class="hero-note">
					Free forever · No account needed · <a href={SITE.repo} rel="noopener">View source on GitHub</a>
				</p>
			</div>
			<div class="hero-demo">
				<LaptopDemo />
			</div>
		</div>
	</section>

	<!-- PROBLEM -->
	<section class="section">
		<div class="container">
			<p class="eyebrow">THE PROBLEM</p>
			<h2 class="h2">Screenshots are where work gets stuck.</h2>
			<p class="lead">
				People screenshot errors, tables, designs and forms because they need to do something with them. Today that
				means switching apps, pasting, and explaining the context all over again.
			</p>
			<div class="compare">
				<div class="compare-card">
					<p class="eyebrow">TODAY</p>
					<ol>
						<li><span>1</span>Take a screenshot</li>
						<li><span>2</span>Open another app or AI chat</li>
						<li><span>3</span>Paste it and explain what you need</li>
						<li><span>4</span>Copy the answer back to where you were</li>
					</ol>
				</div>
				<div class="compare-card dark">
					<p class="eyebrow accent">WITH SCREENSHOTID</p>
					<ol>
						<li><span>1</span>Capture</li>
						<li><span>2</span>Press Enter on the suggested action</li>
					</ol>
					<p>The context is already in the capture. screenshotid reads it, so you don't have to explain it.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- HOW IT WORKS -->
	<section id="how" class="section pt-0">
		<div class="container">
			<p class="eyebrow">HOW IT WORKS</p>
			<h2 class="h2">From screenshot to result in one flow.</h2>
			<div class="rule-grid">
				<div class="rule-item"><p class="eyebrow">STEP 1</p><h3>Capture</h3><p>Press one shortcut and drag over any part of your screen.</p></div>
				<div class="rule-item"><p class="eyebrow">STEP 2</p><h3>Annotate</h3><p>Boxes, arrows, highlights, numbered steps, notes and blur, right on the capture.</p></div>
				<div class="rule-item"><p class="eyebrow">STEP 3</p><h3>Detect</h3><p>AI recognizes what you captured: an error, a table, a design, a diagram, a document or a form.</p></div>
				<div class="rule-item"><p class="eyebrow">STEP 4</p><h3>Act</h3><p>The launcher suggests the right action. Press Enter and the result appears.</p></div>
			</div>
		</div>
	</section>

	<!-- FEATURES -->
	<section id="features" class="section pt-0">
		<div class="container">
			<p class="eyebrow">FEATURES</p>
			<h2 class="h2">Seven kinds of content. One launcher that knows each one.</h2>
			<p class="lead">Pick a card to see it running on the laptop above.</p>
			<div class="cards">
				{#each FEATURES as f, i (f.id)}
					<a class="card" href="#product" onclick={() => showFeature(i)}>
						<span class="card-top"><span>{f.kind}</span><span>0{i + 1}</span></span>
						<span class="card-title">{f.action}</span>
						<span class="card-desc">{f.desc}</span>
						<span class="card-link">See it on screen →</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- AUDIENCE -->
	<section class="section pt-0">
		<div class="container">
			<p class="eyebrow">WHO IT'S FOR</p>
			<h2 class="h2">Everyone takes screenshots. Each team needs something different from them.</h2>
			<div class="rule-grid">
				<div class="rule-item"><h3>Developers</h3><p>Debug stack traces and explain architecture diagrams without leaving the editor.</p></div>
				<div class="rule-item"><h3>Designers</h3><p>Turn mockups into component code and hand off annotated feedback.</p></div>
				<div class="rule-item"><h3>Analysts &amp; ops</h3><p>Pull tables out of dashboards and reports straight into a spreadsheet.</p></div>
				<div class="rule-item"><h3>Everyone else</h3><p>Summarize long documents, understand confusing forms, and share screenshots safely.</p></div>
			</div>
		</div>
	</section>

	<!-- PRIVACY -->
	<section id="privacy" class="section soft">
		<div class="container">
			<p class="eyebrow">PRIVACY</p>
			<h2 class="h2">Screenshots are personal. You stay in control.</h2>
			<div class="rule-grid">
				<div class="rule-item"><h3>You decide what's sent</h3><p>A capture is only sent to AI after you pick an action, never automatically.</p></div>
				<div class="rule-item"><h3>Blur before you send</h3><p>Hide emails, tokens and other sensitive details right in the annotation toolbar.</p></div>
				<div class="rule-item"><h3>Your history, your device</h3><p>Captures and results are stored locally. Delete them anytime from Settings.</p></div>
			</div>
		</div>
	</section>

	<!-- SECURITY -->
	<section id="security" class="section dark">
		<div class="container">
			<p class="eyebrow">TRUST &amp; SECURITY</p>
			<h2 class="h2">How screenshotid handles your data.</h2>
			<p class="lead">Clear rules for what leaves your device and where it goes.</p>
			<div class="trust">
				<div class="trust-card">
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="14" height="9" rx="2" /><path d="M7 10V7a4 4 0 0 1 8 0v3" /></svg>
					<h3>Local by default</h3>
					<p>Captures and annotations stay on your device. Nothing is uploaded until you run an AI action.</p>
				</div>
				<div class="trust-card">
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="M3 11h16M11 3a12 12 0 0 1 0 16M11 3a12 12 0 0 0 0 16" /></svg>
					<h3>Encrypted in transit</h3>
					<p>When you run an action, the capture is sent over HTTPS straight to the AI provider you chose.</p>
				</div>
				<div class="trust-card">
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h14M8 6V4h6v2M6 6l1 13h8l1-13" /></svg>
					<h3>No screenshotid servers</h3>
					<p>We don't run servers that receive or store your captures, so there is nothing of yours for us to keep.</p>
				</div>
				<div class="trust-card">
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6L3 11l5 5M14 6l5 5-5 5" /></svg>
					<h3>Open source</h3>
					<p>Every line of code is public on GitHub, so anyone can audit exactly what is sent and where.</p>
				</div>
			</div>
			<div class="trust-links">
				<a href="/privacy">Privacy Policy →</a>
				<a href="/terms">Terms of Use →</a>
				<a href={SITE.security} rel="noopener">Report a vulnerability →</a>
			</div>
		</div>
	</section>

	<!-- PRICING -->
	<section id="pricing" class="section">
		<div class="container">
			<p class="eyebrow">PRICING</p>
			<h2 class="h2">Free and open source. Every feature, for everyone.</h2>
			<div class="price">
				<div class="price-main">
					<div class="price-amount">$0<span>forever</span></div>
					<p>No plans, no paywalls, no account. Download it, connect your AI key, and use everything.</p>
					<div class="price-ctas">
						<a class="btn btn-accent" href={SITE.releases} rel="noopener">Download screenshotid</a>
						<a class="btn btn-ghost" href={SITE.repo} rel="noopener">View source on GitHub</a>
					</div>
				</div>
				<ul class="price-list">
					<li>All seven AI actions</li>
					<li>Full annotation toolbar: boxes, arrows, highlights, steps, notes and blur</li>
					<li>Export to CSV, React, HTML and Mermaid</li>
					<li>Bring your own AI provider and API key</li>
					<li>macOS and Windows</li>
					<li>Source code you can read, audit and improve</li>
				</ul>
			</div>
			<p class="price-note">The only cost is your AI provider's API usage, billed by them directly.</p>
		</div>
	</section>

	<!-- ROADMAP -->
	<section class="section pt-0">
		<div class="container">
			<p class="eyebrow">WHAT'S NEXT</p>
			<h2 class="h2">Built in the open, shaped by its users.</h2>
			<div class="roadmap">
				<div class="road dark">
					<p class="eyebrow accent">FOUNDATION</p>
					<h3>Capture, annotate, act</h3>
					<p>A contextual launcher with seven core actions for everyday screenshots.</p>
				</div>
				<div class="road">
					<p class="eyebrow">NEXT</p>
					<h3>Custom actions &amp; integrations</h3>
					<p>Define your own actions and send results to your editor, docs and chat tools.</p>
				</div>
				<div class="road">
					<p class="eyebrow">LATER</p>
					<h3>Shared action library</h3>
					<p>Share and reuse community-built actions across machines and teams.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section id="faq" class="section pt-0">
		<div class="container faq-wrap">
			<p class="eyebrow">FAQ</p>
			<h2 class="h2">Questions, answered.</h2>
			<div class="faq">
				{#each FAQS as item, i}
					<div class="faq-item">
						<h3>
							<button
								type="button"
								id="faq-q-{i}"
								aria-expanded={openFaq === i}
								aria-controls="faq-a-{i}"
								onclick={() => (openFaq = openFaq === i ? -1 : i)}
							>
								<span>{item.q}</span><span class="sign" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
							</button>
						</h3>
						<div id="faq-a-{i}" role="region" aria-labelledby="faq-q-{i}" hidden={openFaq !== i}>
							<p>{item.a}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- DOWNLOAD -->
	<section id="download" class="section dark download">
		<div class="container narrow">
			<Logo size={44} stroke={2.4} />
			<h2 class="h2 center">Take your first screenshot with screenshotid.</h2>
			<p class="lead center">Install it, press the shortcut, and see which action it suggests.</p>
			<div class="hero-ctas">
				<a class="btn btn-accent" href={SITE.releases} rel="noopener">
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v10M4.5 8 9 12.5 13.5 8M3 15.5h12" /></svg>
					Download for macOS
				</a>
				<a class="btn btn-ghost" href={SITE.releases} rel="noopener">Download for Windows</a>
			</div>
			<p class="hero-note">Free and open source · <a href={SITE.repo} rel="noopener">View source code</a></p>
		</div>
	</section>
</main>

<SiteFooter />

<style>
	.pt-0 {
		padding-top: 0;
	}

	/* hero */
	.hero {
		background: var(--ink);
		color: var(--ground);
		padding: 0 var(--gutter) 96px;
		overflow: hidden;
	}
	.hero-copy {
		text-align: center;
		padding-top: 56px;
	}
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin: 0;
		padding: 6px 14px;
		border: 1px solid var(--dark-line);
		border-radius: 999px;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--dark-text);
	}
	.badge-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent);
	}
	h1 {
		margin: 24px auto 0;
		max-width: 940px;
		font-size: clamp(40px, 6.4vw, 84px);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.045em;
	}
	.hero-lead {
		margin: 24px auto 0;
		max-width: 640px;
		font-size: 20px;
		line-height: 1.55;
		color: var(--dark-text);
	}
	.hero-ctas {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 12px;
		margin-top: 36px;
	}
	.hero-note {
		margin: 16px 0 0;
		font-size: 14px;
		color: var(--dark-muted);
	}
	.hero-note a {
		color: var(--dark-text);
		text-underline-offset: 3px;
	}
	.hero-demo {
		margin-top: 64px;
	}

	/* problem */
	.compare {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		margin-top: 48px;
	}
	.compare-card {
		flex: 1 1 340px;
		min-width: 0;
		padding: 28px;
		border: 1px solid var(--line);
		border-radius: 20px;
		background: var(--paper);
	}
	.compare-card.dark {
		border-color: var(--ink);
		background: var(--ink);
		color: var(--ground);
	}
	.compare-card ol {
		margin: 16px 0 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 12px;
		font-size: 17px;
		color: var(--body);
	}
	.compare-card.dark ol {
		color: var(--ground);
	}
	.compare-card li {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.compare-card li span {
		flex: 0 0 auto;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: 1.5px solid var(--dark-muted);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
	}
	.compare-card.dark li span {
		border-color: var(--accent);
		background: var(--accent);
		color: var(--ink);
		font-weight: 700;
	}
	.compare-card.dark > p:last-child {
		margin: 20px 0 0;
		font-size: 15.5px;
		line-height: 1.6;
		color: var(--dark-text);
	}
	.eyebrow.accent {
		color: var(--accent);
	}

	/* features */
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 16px;
		margin-top: 40px;
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 24px;
		border: 1px solid var(--line);
		border-radius: 18px;
		background: var(--paper);
		text-decoration: none;
		color: var(--ink);
		transition: border-color 0.2s, transform 0.2s;
	}
	.card:hover {
		border-color: var(--ink);
		transform: translateY(-2px);
	}
	.card-top {
		display: flex;
		justify-content: space-between;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--muted);
	}
	.card-title {
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.15;
	}
	.card-desc {
		font-size: 15.5px;
		line-height: 1.55;
		color: var(--body);
	}
	.card-link {
		margin-top: auto;
		padding-top: 6px;
		font-size: 14px;
		font-weight: 600;
	}

	/* security */
	.trust {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 16px;
		margin-top: 48px;
	}
	.trust-card {
		padding: 24px;
		border: 1px solid var(--dark-line);
		border-radius: 18px;
		background: var(--dark-1);
	}
	.trust-card h3 {
		margin: 14px 0 0;
		font-size: 19px;
		font-weight: 700;
	}
	.trust-card p {
		margin: 8px 0 0;
		font-size: 15.5px;
		line-height: 1.55;
		color: var(--dark-text);
	}
	.trust-links {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 28px;
		margin-top: 36px;
		font-size: 15px;
	}
	.trust-links a {
		padding: 10px 0;
		color: var(--ground);
		text-underline-offset: 4px;
	}

	/* pricing */
	.price {
		display: flex;
		flex-wrap: wrap;
		gap: 32px 48px;
		margin-top: 48px;
		padding: clamp(28px, 4vw, 48px);
		border-radius: 24px;
		background: var(--ink);
		color: var(--ground);
	}
	.price-main {
		flex: 1 1 380px;
		min-width: 0;
	}
	.price-amount {
		font-size: clamp(56px, 7vw, 88px);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1;
	}
	.price-amount span {
		margin-left: 12px;
		font-size: 20px;
		font-weight: 500;
		letter-spacing: 0;
		color: var(--dark-text);
	}
	.price-main p {
		margin: 18px 0 0;
		max-width: 460px;
		font-size: 18px;
		line-height: 1.6;
		color: var(--dark-text);
	}
	.price-ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 28px;
	}
	.price-list {
		flex: 1 1 340px;
		min-width: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 14px;
		font-size: 16.5px;
		line-height: 1.5;
	}
	.price-list li {
		position: relative;
		padding-left: 30px;
	}
	.price-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		top: 0;
		color: var(--accent);
		font-weight: 700;
	}
	.price-note {
		margin: 18px 0 0;
		font-size: 14.5px;
		color: var(--muted);
	}

	/* roadmap */
	.roadmap {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		margin-top: 48px;
	}
	.road {
		flex: 1 1 280px;
		min-width: 0;
		padding: 28px;
		border: 1px solid var(--line);
		border-radius: 20px;
	}
	.road.dark {
		border-color: var(--ink);
		background: var(--ink);
		color: var(--ground);
	}
	.road h3 {
		margin: 10px 0 0;
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.road p:last-child {
		margin: 12px 0 0;
		font-size: 16px;
		line-height: 1.6;
		color: var(--body);
	}
	.road.dark p:last-child {
		color: var(--dark-text);
	}

	/* faq */
	.faq-wrap {
		max-width: 880px;
	}
	.faq {
		margin-top: 40px;
		border-top: 1px solid var(--line);
	}
	.faq-item {
		border-bottom: 1px solid var(--line);
	}
	.faq-item h3 {
		margin: 0;
	}
	.faq-item button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		min-height: 64px;
		padding: 16px 0;
		border: 0;
		background: transparent;
		text-align: left;
		font-size: 18px;
		font-weight: 600;
		color: var(--ink);
		cursor: pointer;
	}
	.sign {
		flex: 0 0 auto;
		font-size: 22px;
		font-weight: 400;
		color: var(--muted);
	}
	.faq-item p {
		margin: 0;
		padding: 0 40px 22px 0;
		font-size: 16.5px;
		line-height: 1.6;
		color: var(--body);
	}

	/* download */
	.download {
		text-align: center;
	}
	.narrow {
		max-width: 760px;
	}
	.center {
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}
	.download .h2 {
		margin-top: 20px;
	}
	.download .hero-note a {
		color: var(--dark-text);
	}
</style>

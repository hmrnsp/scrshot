<script>
	import LegalPage from '#lib/components/LegalPage.svelte';
	import { SITE } from '#lib/site.js';
</script>

<LegalPage
	title="Privacy Policy"
	description="How the scrshot app and the screenshot.id website handle your data."
	path="/privacy"
	updated="October 10, 2026"
>
	<p>
		scrshot is free, open-source software developed in public on <a href={SITE.repo} rel="noopener">GitHub</a>. This
		policy explains what data the scrshot desktop app and the {SITE.domain} website handle, and where it goes. The short
		version: your captures stay on your device unless you run an AI action, and even then they go straight to the AI
		provider you chose, not to us.
	</p>

	<h2>1. The scrshot app</h2>
	<p>scrshot does not require an account and does not send data to servers operated by the scrshot project.</p>
	<ul>
		<li><b>Captures and annotations</b> are created and stored on your device.</li>
		<li><b>Settings and history</b>, including your AI provider choice, are stored locally on your device.</li>
		<li><b>API keys</b> you add are stored on your device and are only sent to the AI provider they belong to.</li>
	</ul>

	<h2>2. AI actions</h2>
	<p>
		When you run an AI action, scrshot sends the capture, your annotations and the action you chose directly from your
		device to the AI provider you configured, over an encrypted HTTPS connection. That provider processes the request
		under its own terms and privacy policy, including how long it keeps request data and whether it uses it for
		training. Review your provider's policies before you connect a key. Nothing is sent until you choose an action.
	</p>

	<h2>3. The screenshot.id website</h2>
	<p>
		This website does not use cookies, analytics or advertising trackers, and it loads its fonts from our own server
		rather than a third party. Like any website, the server that hosts it may keep standard access logs, such as IP
		address, browser type and the pages requested, to keep the site secure and reliable.
	</p>

	<h2>4. Downloads and GitHub</h2>
	<p>
		Installers and source code are hosted on GitHub. When you download a release, open an issue or contribute, GitHub
		processes your data under the
		<a href="#" rel="noopener">GitHub Privacy Statement</a>.
	</p>

	<h2>5. Your choices and rights</h2>
	<p>
		Because the app stores your data on your device, you are always in control of it: you can delete captures and
		history from Settings or remove the app at any time. Depending on where you live, laws such as Indonesia's Personal
		Data Protection Law (Law No. 27 of 2022) give you rights over your personal data. For data held by your AI provider
		or by GitHub, contact them directly.
	</p>

	<h2>6. Children</h2>
	<p>scrshot is a general-purpose productivity tool and is not directed at children.</p>

	<h2>7. Changes to this policy</h2>
	<p>
		We will update this page if the way scrshot handles data changes, and record the change in the project's public
		history on GitHub. The date at the top shows when it was last updated.
	</p>

	<h2>8. Contact</h2>
	<p>
		Questions about this policy can be raised by opening an issue on the
		<a href={SITE.issues} rel="noopener">scrshot GitHub repository</a>. To report a security problem, use GitHub's
		<a href={SITE.security} rel="noopener">private vulnerability reporting</a> instead of a public issue.
	</p>
</LegalPage>

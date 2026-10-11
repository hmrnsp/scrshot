<script>
	import LegalPage from '$lib/components/LegalPage.svelte';
	import { SITE } from '$lib/site.js';
</script>

<LegalPage
	title="Terms of Use"
	description="The terms for using the scrshot app and the screenshot.id website."
	path="/terms"
	updated="October 10, 2026"
>
	<p>
		These terms cover your use of the scrshot desktop app and the {SITE.domain} website. By downloading or using
		scrshot, you agree to them.
	</p>

	<h2>1. Open-source license</h2>
	<p>
		scrshot is free, open-source software. Your rights to use, copy, modify and distribute the software are set by the
		<a href={SITE.license} rel="noopener">license published in the scrshot repository</a>. If anything in these terms
		conflicts with that license, the license wins.
	</p>

	<h2>2. Your content</h2>
	<p>
		You own your captures, annotations and results. You are responsible for having the right to capture and process the
		content you use with scrshot, including any personal data of other people.
	</p>

	<h2>3. AI providers</h2>
	<p>
		AI actions use a third-party AI provider that you choose and connect with your own API key. Your use of that
		provider is governed by its own terms, and any usage fees are billed by that provider. The scrshot project is not
		responsible for the provider's service, availability or charges.
	</p>

	<h2>4. AI output</h2>
	<p>
		AI results can be incomplete or wrong. Review code, data, summaries and explanations before you rely on them,
		especially for legal, financial, medical or security decisions.
	</p>

	<h2>5. Acceptable use</h2>
	<ul>
		<li>Do not use scrshot to break the law or to infringe other people's rights.</li>
		<li>Do not capture or process other people's personal data without a lawful basis.</li>
		<li>Do not attempt to disrupt or gain unauthorized access to this website or the project's infrastructure.</li>
	</ul>

	<h2>6. No warranty</h2>
	<p>
		scrshot is provided "as is", without warranties of any kind, as described in its license. To the extent permitted by
		law, the scrshot contributors are not liable for any damages arising from your use of the software or this website.
	</p>

	<h2>7. Trademarks</h2>
	<p>
		The open-source license covers the code, not the scrshot name and logo. If you distribute a modified version, please
		give it a different name so people can tell it apart from the official releases.
	</p>

	<h2>8. Changes</h2>
	<p>
		We may update these terms. Changes are published on this page and recorded in the project's public history on
		GitHub. Continuing to use scrshot after a change means you accept the updated terms.
	</p>

	<h2>9. Contact</h2>
	<p>Questions about these terms can be raised by opening an issue on the <a href={SITE.issues} rel="noopener">scrshot GitHub repository</a>.</p>
</LegalPage>

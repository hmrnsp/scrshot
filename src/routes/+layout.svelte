<script>
	import '@fontsource-variable/inter';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/500.css';
	import '@fontsource/jetbrains-mono/700.css';
	import '../app.css';

	let { children } = $props();
</script>

<a class="skip-link" href="#main">Skip to content</a>
{@render children()}

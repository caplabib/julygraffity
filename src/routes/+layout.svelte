<script>
	import './layout.css';
	import { Analytics } from '@vercel/analytics/sveltekit';

	const { children } = $props();
</script>

<Analytics />
{@render children()}

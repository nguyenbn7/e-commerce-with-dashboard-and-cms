<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="mx-auto max-w-7xl">
	{@render children()}
</div>

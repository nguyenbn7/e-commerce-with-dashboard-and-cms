<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import { page } from '$app/state';

	let { class: className }: HTMLAttributes<HTMLElement> = $props();

	const routes = $derived([
		{
			href: `/${page.params.storeId}`,
			label: 'Overview',
			active: page.url.pathname === `/${page.params.storeId}`
		},
		{
			href: `/${page.params.storeId}/billboards`,
			label: 'Billboards',
			active: page.url.pathname === `/${page.params.storeId}/billboards`
		},
		{
			href: `/${page.params.storeId}/categories`,
			label: 'Categories',
			active: page.url.pathname === `/${page.params.storeId}/categories`
		},
		{
			href: `/${page.params.storeId}/sizes`,
			label: 'Sizes',
			active: page.url.pathname === `/${page.params.storeId}/sizes`
		},
		{
			href: `/${page.params.storeId}/colors`,
			label: 'Colors',
			active: page.url.pathname === `/${page.params.storeId}/colors`
		},
		{
			href: `/${page.params.storeId}/products`,
			label: 'Products',
			active: page.url.pathname === `/${page.params.storeId}/products`
		},
		{
			href: `/${page.params.storeId}/orders`,
			label: 'Orders',
			active: page.url.pathname === `/${page.params.storeId}/orders`
		},
		{
			href: `/${page.params.storeId}/settings`,
			label: 'Settings',
			active: page.url.pathname === `/${page.params.storeId}/settings`
		}
	]);
</script>

<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
	{#each routes as route (route.href)}
		<a
			href={route.href}
			class={cn(
				'text-sm font-medium transition-colors hover:text-primary',
				route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
			)}
		>
			{route.label}
		</a>
	{/each}
</nav>

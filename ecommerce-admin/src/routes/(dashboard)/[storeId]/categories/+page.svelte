<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { ApiList } from '$lib/components/api';
	import { DataTable } from '$lib/components/data-table';
	import { columns } from '$features/categories/columns';
	import Plus from '@lucide/svelte/icons/plus';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Categories" />

<div class="flex items-center justify-between">
	<Heading
		title={`Categories (${data.categories.length})`}
		description="Manage categories for your store"
	/>

	<Button href={`/${page.params.storeId}/categories/create`}>
		<Plus class="mr-2 size-4" />
		Add new
	</Button>
</div>

<Separator />

<DataTable data={data.categories} {columns} searchColumnId="name" />

<Heading title="API" description="API calls for Categories" class="mt-3" />

<Separator />

<ApiList entityName="categories" entityIdName="categoryId" />

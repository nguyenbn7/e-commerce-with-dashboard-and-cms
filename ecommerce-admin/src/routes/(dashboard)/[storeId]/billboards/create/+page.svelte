<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { BillboardForm } from '$features/billboards/components';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Create billboard" />

<Heading title="Create billboard" description="Add a new billboard" />

<Separator />

<BillboardForm form={data.form} createForm />

<Separator />

<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { DeleteButton } from '$lib/components/button';
	import { BillboardForm } from '$features/billboards/components';
	import { deleteBillboardMutation } from '$features/billboards/api';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteMutation = deleteBillboardMutation({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<Metadata title="Edit billboard" />

<div class="flex items-center justify-between">
	<Heading title="Edit billboard" description="Edit a billboard" />

	<DeleteButton
		onDelete={() => {
			$deleteMutation.mutate({
				param: {
					storeId: data.store.id.toString(),
					billboardId: data.billboard.id.toString()
				}
			});
		}}
	/>
</div>

<Separator />

<BillboardForm form={data.form} disabled={$deleteMutation.isPending} />

<Separator />

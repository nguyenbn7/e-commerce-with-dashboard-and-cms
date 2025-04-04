<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { ApiAlert } from '$lib/components/api';
	import { confirmFromDialog } from '$lib/components/confirm-dialog';
	import { SettingsForm } from '$features/stores/components';
	import { useDeleteStore } from '$features/stores/api/use-delete-store';
	import Trash from '@lucide/svelte/icons/trash';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteStore = useDeleteStore({
		onSuccess: () => {
			toast.success('Store deleted');
			window.location.reload();
		},
		onError() {
			toast.error('Make sure you removed all products and categories first');
		}
	});

	async function onDelete(
		$event:
			| (MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
			| (MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement })
	) {
		$event.preventDefault();

		const ok = await confirmFromDialog({
			title: 'Are you sure?',
			description: 'This action cannot be undone.'
		});

		if (ok) {
			$deleteStore.mutate({ param: { id: data.store.id.toString() } });
		}
	}
</script>

<Metadata title="Settings" />

<div class="flex items-center justify-between">
	<Heading title="Settings" description="Manage store preferences" />

	<Button variant="destructive" size="sm" onclick={onDelete}>
		<Trash size={16} />
	</Button>
</div>

<Separator />

<SettingsForm
	form={data.form}
	disabled={$deleteStore.isPending}
	onUpdated={({ form }) => {
		if (form.valid) {
			toast.success('Store updated');
			window.location.reload();
		}
	}}
	onError={() => {
		toast.error('Something went wrong');
	}}
/>

<Separator />

<ApiAlert title="PUBLIC_API_URL" description={`${page.url.origin}/api/${page.params.storeId}`} />

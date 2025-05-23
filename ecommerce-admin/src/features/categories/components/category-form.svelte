<script lang="ts">
	import type { Billboard } from '$features/billboards/api/get-billboards';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { z } from 'zod';

	import { categoryFormSchema } from '$features/categories/schema';

	import { Form } from '$lib/components/form';

	import { Input } from '$lib/components/ui/input';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';

	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		form: SuperValidated<z.infer<typeof categoryFormSchema>, any>;
		action?: string | undefined | null;
		disabled?: boolean;
		createForm?: boolean;
		billboards?: Billboard[];
		onSuccess?: () => void;
	}

	let {
		form: _form,
		action,
		billboards = [],
		disabled: _disabled = false,
		createForm = false,
		onSuccess
	}: Props = $props();

	const form = superForm(_form, {
		validators: zodClient(categoryFormSchema),
		onUpdated({ form }) {
			if (form.valid) {
				if (createForm) toast.success('Category created');
				else {
					formData.set(form.data);
					toast.success('Category updated');
				}
				return onSuccess?.();
			}

			if (form.message) {
				toast.error(form.message);
			}
		},
		onError() {
			// TODO:
			toast.error('Something went wrong');
		}
	});

	const { form: formData } = form;
</script>

<Form {form} {action} disabled={_disabled} {createForm}>
	{#snippet content({ disabled })}
		<div class="grid grid-cols-3 gap-8">
			<FormField {form} name="name">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Name</FormLabel>

						<Input
							{...props}
							{disabled}
							placeholder="Category name"
							class="mt-2"
							bind:value={$formData.name}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField {form} name="billboardId">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Billboard</FormLabel>

						<Select type="single" {disabled} name={props.name} bind:value={$formData.billboardId}>
							<SelectTrigger {...props} class="mt-2">
								{billboards.find((b) => b.id === $formData.billboardId)?.label ?? ''}
							</SelectTrigger>

							<SelectContent>
								{#each billboards as billboard (billboard.id)}
									<SelectItem value={billboard.id.toString()}>
										{billboard.label}
									</SelectItem>
								{/each}
							</SelectContent>
						</Select>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>
		</div>
	{/snippet}
</Form>

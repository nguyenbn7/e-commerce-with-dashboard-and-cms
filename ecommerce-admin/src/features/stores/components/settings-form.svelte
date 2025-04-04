<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { settingsFormSchema, type SettingsFormValues } from '../schemas';
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zodClient } from 'sveltekit-superforms/adapters';

	type FormValues = SuperValidated<SettingsFormValues, any, SettingsFormValues>;

	interface Props {
		form: FormValues;
		action?: string | undefined | null;
		disabled?: boolean;
		onUpdated?: (event: { form: Readonly<FormValues> }) => MaybePromise<unknown | void>;
		onUpdate?: (event: {
			form: FormValues;
			formElement: HTMLFormElement;
			cancel: () => void;
			result: Required<
				Extract<
					ActionResult,
					{
						type: 'success' | 'failure';
					}
				>
			>;
		}) => MaybePromise<unknown | void>;
		onError?:
			| 'apply'
			| ((event: {
					result: {
						type: 'error';
						status?: number;
						error:
							| App.Error
							| Error
							| {
									message: string;
							  };
					};
			  }) => MaybePromise<unknown | void>);
	}

	let {
		form: sForm,
		action,
		onUpdated,
		onError,
		onUpdate,
		disabled: externalDisabled = false
	}: Props = $props();

	const form = superForm(sForm, {
		validators: zodClient(settingsFormSchema),
		onUpdated,
		onUpdate,
		onError
	});

	const { form: formData, enhance, delayed } = form;

	let disabled = $derived($delayed || externalDisabled);
</script>

<form method="post" {action} class="space-y-8 w-full" use:enhance>
	<div class="grid grid-cols-3 gap-8">
		<FormField {form} name="name">
			<FormControl>
				{#snippet children({ props })}
					<FormLabel>Name</FormLabel>

					<Input
						{...props}
						{disabled}
						placeholder="Store name"
						class="mt-2"
						bind:value={$formData.name}
					/>
				{/snippet}
			</FormControl>

			<FormFieldErrors />
		</FormField>
	</div>

	<FormButton {disabled} class="ml-auto">Save Changes</FormButton>
</form>

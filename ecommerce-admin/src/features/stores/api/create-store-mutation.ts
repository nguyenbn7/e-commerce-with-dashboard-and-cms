import type { InferRequestType, InferResponseType } from 'hono';
import { createMutation } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';
import { client } from '$lib/rpc';

type Response = InferResponseType<(typeof client.api.stores)['$post']>;
type Request = InferRequestType<(typeof client.api.stores)['$post']>['json'];
type ResponseError = { error: { code: number; message: string } };

type Options = {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
};

export default function createStoreMutation(
	options: Options = { onSuccess: undefined, onError: undefined }
) {
	const { onSuccess, onError } = options;

	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async (json) => {
			const response = await client.api.stores.$post({ json });

			if (!response.ok) {
				const { error } = (await response.json()) as unknown as ResponseError;

				throw new Error(error.message);
			}

			return response.json();
		},
		onSuccess(data, variables, context) {
			toast.success('Store created');
			return onSuccess?.(data, variables, context);
		},
		onError(error, variables, context) {
			toast.error('Something went wrong');
			return onError?.(error, variables, context);
		}
	});

	return mutation;
}

import type { Actions, PageServerLoad } from './$types';

import { StatusCodes } from 'http-status-codes';

import { fail, redirect } from '@sveltejs/kit';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { sizeFormSchema } from '$features/sizes/schemas';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { storeIdSchema } from '$features/stores/schemas';
import { createSize } from '$features/sizes/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const form = await superValidate(zod(sizeFormSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { userId } = locals.auth();
		if (!userId) redirect(307, '/sign-in');

		const result = storeIdSchema.safeParse({ storeId: params.storeId });
		if (!result.success) redirect(307, '/');

		const form = await superValidate(request, zod(sizeFormSchema));
		if (!form.valid) return fail(400, { form });

		const { storeId } = result.data;

		const store = await findStoreByUserIdAndStoreId(userId, storeId);
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const { name, value } = form.data;

		await createSize(storeId, { name, value });

		return { form };
	}
};

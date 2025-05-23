import { z } from 'zod';

export const colorFormSchema = z.object({
	name: z.string().min(1, 'Required'),
	value: z.string().trim().min(4).regex(/^#/, {
		message: 'String must be a valid hex code'
	})
});

export const colorIdSchema = z.object({
	id: z.string().min(1, 'Required')
});

export const storeIdSchema = z.object({
	storeId: z.string().trim()
});

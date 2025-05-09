import { z } from 'zod';

export const categoryFormSchema = z.object({
	name: z.string().min(1),
	billboardId: z.coerce.number().min(1, 'Required')
});

export const categoryIdSchema = z.object({
	categoryId: z.coerce.number()
});

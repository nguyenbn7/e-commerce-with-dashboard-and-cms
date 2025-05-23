import { z } from 'zod';

export const billboardFormSchema = z.object({
	label: z.string().trim().min(1, 'label contains spaces or empty'),
	imageUrl: z.string().trim().min(1, 'imageUrl contains spaces or empty')
});

export const billboardIdSchema = z.object({
	id: z.string().trim()
});

export const storeIdSchema = z.object({
	storeId: z.string().trim()
});

import { z } from 'zod';

export const productFormSchema = z.object({
	name: z.string().min(1, 'Required'),
	images: z.object({ url: z.string() }).array().min(1, 'Required'),
	price: z.coerce.number().min(1, 'Must greater than 0.00'),
	categoryId: z.coerce.number().min(1, 'Required'),
	colorId: z.coerce.number().min(1, 'Required'),
	sizeId: z.coerce.number().min(1, 'Required'),
	isFeatured: z.boolean().default(false).optional(),
	isArchived: z.boolean().default(false).optional()
});

export const productIdSchema = z.object({
	productId: z.coerce.number()
});

export const productsSearchParamsSchema = z.object({
	categoryId: z.coerce.number().optional(),
	colorId: z.coerce.number().optional(),
	sizeId: z.coerce.number().optional(),
	isFeatured: z
		.string()
		.toLowerCase()
		.transform((v) => JSON.parse(v))
		.pipe(z.boolean())
		.optional()
});

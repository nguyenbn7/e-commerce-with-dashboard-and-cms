import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { clerkMiddlewareAuthenticated } from '$lib/server/hono.middleware';
import { setupSchema, storeIdSchema } from '../schemas';
import { createStore, deleteStore, getStores } from './repository';

const app = new Hono()
	.use(
		clerkMiddleware({ secretKey: CLERK_SECRET_KEY, publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY })
	)
	.get('/', clerkMiddlewareAuthenticated(), async (c) => {
		const userId = c.get('userId');

		const stores = await getStores(userId);

		return c.json({
			status: 'success',
			data: {
				stores
			}
		});
	})
	.post('/', clerkMiddlewareAuthenticated(), zValidator('json', setupSchema), async (c) => {
		const userId = c.get('userId');

		const { name } = c.req.valid('json');

		const store = await createStore(userId, { name });

		return c.json({
			status: 'success',
			data: {
				store
			}
		});
	})
	.delete('/:id', clerkMiddlewareAuthenticated(), zValidator('param', storeIdSchema), async (c) => {
		const { id: storeId } = c.req.valid('param');
		const userId = c.get('userId');

		await deleteStore(userId, storeId);

		return c.json({
			status: 'success',
			data: null
		});
	});

export default app;

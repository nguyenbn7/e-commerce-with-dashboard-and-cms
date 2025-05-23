import type { APIAppType } from './server/router';
import { PUBLIC_BASE_API_URL } from '$env/static/public';
import { hc } from 'hono/client';

export const client = hc<APIAppType>(PUBLIC_BASE_API_URL);

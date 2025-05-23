import { PUBLIC_API_URL } from '$env/static/public';
import queryString from 'query-string';

interface ProductsQuery {
	categoryId?: number | string;
	colorId?: number | string;
	sizeId?: number | string;
	isFeatured?: boolean;
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

const URL = `${PUBLIC_API_URL}/products`;

export default async function getProducts(
	params: ProductsQuery = {}
): Promise<{ products: Product[] }> {
	const { categoryId, colorId, sizeId, isFeatured, fetch: ssrFetch } = params;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const url = queryString.stringifyUrl({
		url: URL,
		query: {
			categoryId,
			colorId,
			sizeId,
			isFeatured
		}
	});

	try {
		const response = await _fetch(url);

		return response.json();
	} catch (error) {
		return { products: [] };
	}
}

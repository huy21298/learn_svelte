import HttpService from '$lib/HttpService';
import type { Cart } from '@/types/Cart.js';
import type { Product } from '@/types/Product';

export async function load({ cookies }) {
	const httpService = new HttpService('/products');
	const cartItems = cookies.get('carts') || ([] as Cart[]);
	const { data } = await httpService.get<Product[]>();

	return {
		products: data,
		cartItems
	};
}

import { writable } from 'svelte/store';

import type { Product } from '@/types/Product';

const { update, subscribe } = writable<Product[]>([]);

const productsStore = {
	subscribe,
	setProducts(products: Product[]) {
		update(() => products);
	}
};

export default productsStore;

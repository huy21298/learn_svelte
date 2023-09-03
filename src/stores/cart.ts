import { writable } from 'svelte/store';

import type { Cart } from '@/types/Cart';

const { update, subscribe } = writable({
	cartItems: [] as Cart[],
	isOpen: false
});

const cartStore = {
	subscribe,
	setCartItems(cartItems: Cart[]) {
		update((val) => ({
			...val,
			cartItems
		}));
	},
	setIsOpenCart(isOpen: boolean) {
		update((val) => ({
			...val,
			isOpen
		}));
	}
};

export default cartStore;

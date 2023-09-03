<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import ProductCard from '@/components/Products/ProductCard.svelte';
	import CartList from '@/components/Products/CartList.svelte';

	import productsStore from '@/stores/products';
	import cartStore from '@/stores/cart';

	import type { Cart } from '@/types/Cart';
	import type { Product } from '@/types/Product';

	export let data: { products: Product[]; cartItems: Cart[] };

	let products: Product[];

	const unsubcribeProductsStore = productsStore.subscribe((val) => {
		products = val;
	});

	const onOpenCart = () => {
		cartStore.setIsOpenCart(true);
	};

	onMount(() => {
		productsStore.setProducts(data.products);
	});

	onDestroy(unsubcribeProductsStore);
</script>

<nav class="bg-gray-800">
	<div class="mx-auto md:px-[24px] px-[16px]">
		<div class="relative flex h-16 items-center justify-end">
			<button class="text-white" on:click={onOpenCart}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					class="w-[24px] h-[24px] inline align-middle"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					/>
				</svg>
				<span class="align-middle ml-2">0</span>
			</button>
		</div>
	</div>
</nav>

<div
	class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4 md:mt-4 md:mx-4 md:mb-4"
>
	{#each products as item (item.id)}
		<ProductCard product={item} />
	{/each}
</div>

<CartList />

<style lang="postcss">
</style>

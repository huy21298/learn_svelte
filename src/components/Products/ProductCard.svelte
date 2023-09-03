<script lang="ts">
	import productsStore from '@/stores/products';
	import type { Product } from '@/types/Product';

	export let product: Product;
</script>

<div
	class="w-full bg-white border border-gray-200 md:rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img class="p-8 rounded-t-lg" src={product.image} alt="product image" />
	<div class="px-5 pb-5 mb-5">
		<a href="#">
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{product.name}
			</h5>
		</a>
		<div class="flex items-center justify-between mt-2.5">
			<span class="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
			<button
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Add to cart
			</button>
		</div>
	</div>
</div>

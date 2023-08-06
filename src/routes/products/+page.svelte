<script lang="ts">
	// /** @type {import('./$types').PageData} */
	// export let data;
</script>

<nav class="bg-gray-800">
	<div class="mx-auto md:px-[24px] px-[16px]">
		<div class="relative flex h-16 items-center justify-end">
			<button class="text-white">
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
	{#each [1, 2, 3, 4, 5] as num}
		<div
			class="w-full bg-white border border-gray-200 md:rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
		>
			<a href="#">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="p-8 rounded-t-lg"
					src="https://flowbite.com/docs/images/products/apple-watch.png"
					alt="product image"
				/>
			</a>
			<div class="px-5 pb-5 mb-5">
				<a href="#">
					<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
						Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
					</h5>
				</a>
				<div class="flex items-center justify-between mt-2.5">
					<span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
					<a
						href="#"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Add to cart</a
					>
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
</style>

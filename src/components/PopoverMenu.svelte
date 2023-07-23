<script lang="ts">
	export let referenceElement: HTMLButtonElement;
	export let isShowing: boolean = false;

	let positionX = 0;
	let positionY = 0;

	$: if (referenceElement) {
		const { top, left } = referenceElement.getBoundingClientRect();
		positionX = top;
		positionY = left;
		console.log('top', top);
		console.log('left', left);
	}

	console.log('positionX', positionX);
	console.log('positionY', positionY);
</script>

<div class="popover-container">
	<div
		class="popover-content"
		style="top: {positionX}; left: {positionY}; opacity: {isShowing ? 1 : 0}"
	>
		<slot />
	</div>
</div>

<style lang="scss">
	.popover-container {
		position: absolute;
	}

	.popover-content {
		border-radius: 4px;
		z-index: 2;
		background-color: #f9f9f9;
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
</style>

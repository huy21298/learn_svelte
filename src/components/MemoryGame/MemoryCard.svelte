<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import questionMarkImage from '$lib/assets/images/question-mark.png';

	import type { IFlag } from '@/types/Flag';

	export let flag: IFlag;
	export let flipped = false;

	const dispatch = createEventDispatcher<{ toggle: IFlag & { flipped: boolean } }>();

	const onToggleCard = () => {
		if (flipped) {
			return;
		}
		dispatch('toggle', {
			...flag,
			flipped
		});
	};
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flip-card" role="button" class:flipped on:click={onToggleCard}>
	<div class="flip-card-inner">
		<div class="flip-card-front">
			<img src={questionMarkImage} alt="question_mark" />
		</div>
		<div class="flip-card-back">
			<img src={flag.src} alt="logo_brand" />
		</div>
	</div>
</div>

<style lang="scss">
	$square: 80px;

	.flip-card {
		background-color: transparent;
		min-width: $square;
		min-height: $square;
		display: inline-block;
		cursor: pointer;

		&.flipped {
			.flip-card-inner {
				transform: rotateY(180deg);
			}
		}
	}

	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.flip-card-front {
		background: linear-gradient(
			30deg,
			rgba(2, 0, 36, 1) 0%,
			rgba(0, 212, 255, 1) 0%,
			rgba(127, 209, 245, 1) 75%
		);
		color: black;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 45px;
			height: 45px;
		}
	}

	.flip-card-back {
		// background-color: #2980b9;
		color: white;
		transform: rotateY(180deg);

		img {
			width: $square;
			height: $square;
		}
	}
</style>

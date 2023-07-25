<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { IFlag } from '@/types/Flag';

	export let flag: IFlag;
	export let flipped = false;

	const dispatch = createEventDispatcher<{ toggle: IFlag & { flipped: boolean } }>();

	const onToggleCard = () => {
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
			<div class="flip-card-pattern" />
		</div>
		<div class="flip-card-back">
			<img src={flag.src} alt="Avatar" />
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
		background-color: #bbb;
		color: black;
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

	.flip-card-pattern {
		--bg-2: hsl(206, 20%, 90%);
		--bg-3: hsl(206, 20%, 80%);

		width: 100%;
		height: 100%;
		background-color: var(--bg-2);
		/* pattern from https://projects.verou.me/css3patterns/#marrakesh */
		background-image: radial-gradient(var(--bg-3) 0.9em, transparent 1em),
			repeating-radial-gradient(
				var(--bg-3) 0,
				var(--bg-3) 0.4em,
				transparent 0.5em,
				transparent 2em,
				var(--bg-3) 2.1em,
				var(--bg-3) 2.5em,
				transparent 2.6em,
				transparent 5em
			);
		background-size: 3em 3em, 9em 9em;
		background-position: 0 0;
		border-radius: 1em;
	}
</style>

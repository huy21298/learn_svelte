<script lang="ts">
	import MemoryCard from '@/components/MemoryGame/MemoryCard.svelte';

	import programmingLanguages from '$lib/programmingLanguages';
	import { generateGuid } from '$lib/generateGuid';

	import type { IFlag } from '@/types/Flag';

	let sufferFlags: IFlag[];
	let choiceOne = '';
	let choiceTwo = '';
	let selectedCards: string[] = [];
	let timeout = null as number | null;

	$: {
		sufferFlags = [...programmingLanguages, ...programmingLanguages]
			.sort(() => Math.random() - 0.5)
			.map((flag) => ({ ...flag, id: generateGuid() }));
	}

	$: {
		if (choiceOne && choiceTwo) {
			const choiceCardOne = sufferFlags.find(({ id }) => id === choiceOne);
			const choiceCardTwo = sufferFlags.find(({ id }) => id === choiceTwo);

			if (choiceCardOne?.name === choiceCardTwo?.name) {
				selectedCards = [...selectedCards, (choiceCardOne as IFlag).name];
			} else {
				timeout = setTimeout(() => {
					choiceOne = '';
					choiceTwo = '';
				}, 800);
			}
		}
	}

	const onToggleCard = (event: CustomEvent<IFlag & { flipped: boolean }>) => {
		const flag = event.detail;
		if (selectedCards.includes(flag.name)) {
			return;
		}
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
		const id = flag.id as string;
		if (choiceOne && choiceTwo) {
			choiceOne = id;
			choiceTwo = '';
		} else if (choiceOne) {
			choiceTwo = id;
		} else {
			choiceOne = id;
		}
	};
</script>

<div class="memory-game-card-list-container">
	<div class="memory-game-card-list">
		{#each sufferFlags as flag (flag.id)}
			<MemoryCard
				{flag}
				on:toggle={onToggleCard}
				flipped={[choiceOne, choiceTwo].includes(flag.id || '') ||
					selectedCards.includes(flag.name)}
			/>
		{/each}
	</div>
</div>

<style>
	.memory-game-card-list-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
	.memory-game-card-list {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 8px;
		max-width: 650px;
	}
</style>

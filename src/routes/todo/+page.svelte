<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import TodoItem from '@/components/TodoList/TodoItem.svelte';
	import PopoverMenu from '@/components/PopoverMenu.svelte';

	import { faListCheck } from '@fortawesome/free-solid-svg-icons';

	let referenceElement: HTMLButtonElement;
	let isShowingPopover = false;

	let filterItems = [
		{
			label: 'All',
			name: 'all'
		},
		{
			label: 'Completed',
			name: 'completed'
		},
		{
			label: 'Uncompleted',
			name: 'uncompleted'
		}
	];

	const onTogglePopover = () => {
		isShowingPopover = !isShowingPopover;
	};

	const onFilter = (item: (typeof filterItems)[number]) => () => {
		onTogglePopover();
	};
</script>

<div class="todo-list-container">
	<div class="todo-app-container">
		<h2>Todo list - Svelte</h2>

		<form class="todo-input-container">
			<Fa icon={faListCheck} />
			<input type="text" class="todo-input" placeholder="Add your todo" />
			<button class="todo-add-button">Add</button>
		</form>

		<ul class="todo-list">
			<TodoItem />
			<TodoItem />
			<TodoItem />
		</ul>

		<div class="todo-list-filter-container">
			<button
				bind:this={referenceElement}
				on:click={onTogglePopover}
				class="todo-list-filter-button">Filter</button
			>

			<PopoverMenu {referenceElement} isShowing={isShowingPopover}>
				<div class="todo-list-filter-menu-container">
					{#each filterItems as item, i (item.name)}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="todo-list-filter-menu-item"
							role="button"
							tabindex={i}
							on:click={onFilter(item)}
						>
							{item.label}
						</div>
					{/each}
				</div>
			</PopoverMenu>

			<div class="todo-list-count-completed-tasks">Completed: 2</div>
			<div class="todo-list-count-remaining-tasks">Total Tasks: 3</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '@/styles/global.scss';

	.todo-list-container {
		background: orange;
		min-height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
	}

	.todo-app-container {
		background: #fff;
		border: 2px solid #000;
		border-radius: 15px;
		margin: auto;
		max-width: 540px;
		padding: 40px 30px 70px;
		width: 100%;

		h2 {
			align-items: center;
			color: blue;
			display: flex;
			justify-content: center;
			margin-bottom: 20px;
		}
	}

	.todo-input-container {
		align-items: center;
		background: #edeef0;
		border-radius: 30px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 25px;
		padding-left: 20px;
	}

	.todo-input {
		border: none;
		font-size: 15px;
		margin-bottom: 3px;
		outline: none;
		padding: 11px;
		width: 100%;
		background-color: transparent;
		flex: 1 1;
		position: relative;
	}

	.todo-add-button {
		background: #ff5945;
		border-radius: 40px;
		color: #fff;
		cursor: pointer;
		font-size: 16px;
		padding: 16px 50px;
		border: none;
	}

	.todo-list-filter-menu-container {
		min-width: 200px;
	}

	.todo-list-filter-menu-item {
		@include clickable;
		padding: 12px 16px;

		&:hover {
			@include clickable;
			background-color: #f1f1f1;
		}
	}

	.todo-list-filter-container {
		margin-top: 40px;
	}

	.todo-list-filter-button {
		background-color: #4caf50;
		border: none;
		border-radius: 5px;
		color: #fff;
		cursor: pointer;
		font-size: 16px;
		padding: 10px 16px;
	}

	.todo-list-count-completed-tasks,
	.todo-list-count-remaining-tasks {
		display: inline-block;
		margin-left: 100px;
	}

	.todo-list-count-remaining-tasks {
		color: gray;
		font-size: 13px;
		margin-bottom: 20px;
	}
</style>

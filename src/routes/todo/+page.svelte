<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import TodoItem from '@/components/TodoList/TodoItem.svelte';
	import PopoverMenu from '@/components/PopoverMenu.svelte';
	import TodoForm from '@/components/TodoList/TodoForm.svelte';

	import { generateGuid } from '$lib/generateGuid';

	import type { ITodo, IFilterState, IFilterItem } from '@/types/Todo';

	let referenceElement: HTMLButtonElement;
	let isShowingPopover = false;
	let todoName = '';
	let filterItems: IFilterItem[] = [
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

	let todoItems: ITodo[] = [];
	let filterState: IFilterState = 'all';
	let filteredTodos = [] as ITodo[];

	$: completedTodo = todoItems.filter((todo) => todo.status === 'completed');

	$: switch (filterState) {
		case 'completed': {
			filteredTodos = completedTodo;
			break;
		}
		case 'uncompleted': {
			filteredTodos = todoItems.filter((todo) => todo.status === 'uncompleted');
			break;
		}
		default: {
			filteredTodos = todoItems;
		}
	}

	$: {
		filterState = ($page.url.searchParams.get('status') || 'all') as IFilterState;
	}

	$: filterStateLabel = filterItems.find((filter) => filter.name === filterState);

	const onTogglePopover = () => {
		isShowingPopover = !isShowingPopover;
	};

	const onFilter = (item: (typeof filterItems)[number]) => () => {
		onTogglePopover();
	};

	const addTodo = (todoName: string) => {
		const todo: ITodo = {
			id: generateGuid(),
			name: todoName,
			status: 'uncompleted'
		};
		todoItems = [...todoItems, todo];
	};

	const onSubmit = (event: CustomEvent<{ todoName: string }>) => {
		addTodo(event.detail.todoName);
		todoName = '';
	};

	const onChangeTodoStatus = (event: CustomEvent<ITodo>) => {
		const newTodo = event.detail;
		const index = todoItems.findIndex(({ id }) => id === newTodo.id);
		todoItems = [...todoItems.slice(0, index), newTodo, ...todoItems.slice(index + 1)];
	};

	const onChangeTodoName = (event: CustomEvent<ITodo>) => {
		const newTodo = event.detail;
		const index = todoItems.findIndex(({ id }) => id === newTodo.id);
		todoItems = [...todoItems.slice(0, index), newTodo, ...todoItems.slice(index + 1)];
	};

	const onRemoveTodo = (event: CustomEvent<ITodo>) => {
		if (window.confirm('Are you sure you want to delete this todo?')) {
			const deletingTodo = event.detail;
			const index = todoItems.findIndex(({ id }) => id === deletingTodo.id);
			todoItems = [...todoItems.slice(0, index), ...todoItems.slice(index + 1)];
		}
	};
</script>

<div class="todo-list-container">
	<div class="todo-app-container">
		<h2>Todo list - Svelte</h2>

		<TodoForm on:submit={onSubmit} bind:value={todoName} />

		<ul class="todo-list">
			{#each filteredTodos as todo (todo.id)}
				<TodoItem
					{todo}
					on:changeStatus={onChangeTodoStatus}
					on:remove={onRemoveTodo}
					on:changeName={onChangeTodoName}
				/>
			{/each}
		</ul>

		<div class="todo-list-filter-container">
			<button
				bind:this={referenceElement}
				on:click={onTogglePopover}
				class="todo-list-filter-button">Filter: {filterStateLabel?.label}</button
			>

			<PopoverMenu {referenceElement} isShowing={isShowingPopover}>
				<div class="todo-list-filter-menu-container">
					{#each filterItems as item, i (item.name)}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<a
							class="todo-list-filter-menu-item"
							role="button"
							tabindex={i}
							on:click={onFilter(item)}
							href="{$page.url.pathname}/?status={item.name}"
						>
							{item.label}
						</a>
					{/each}
				</div>
			</PopoverMenu>

			<div class="todo-list-count-completed-tasks">Completed: {completedTodo.length}</div>
			<div class="todo-list-count-remaining-tasks">Total Tasks: {todoItems.length}</div>
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

	.todo-list {
		max-height: 300px;
		overflow: auto;
	}

	.todo-list-filter-menu-container {
		min-width: 200px;
	}

	.todo-list-filter-menu-item {
		@include clickable;
		padding: 12px 16px;
		display: block;
		text-decoration: none;
		color: #000;

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
		margin-left: 16px;
	}

	.todo-list-count-remaining-tasks {
		color: gray;
		font-size: 13px;
		margin-bottom: 20px;
	}
</style>

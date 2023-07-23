<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Fa from 'svelte-fa/src/fa.svelte';

	import { faPenToSquare, faTrash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

	import type { ITodo } from '@/types/Todo';

	const dispatchChangeStatus = createEventDispatcher<{ changeStatus: ITodo }>();
	const dispatchRemove = createEventDispatcher<{ remove: ITodo }>();
	const dispatchChangeName = createEventDispatcher<{ changeName: ITodo }>();

	export let todo: ITodo;

	let isEditing = false;
	let editingTodoName = '';

	$: {
		editingTodoName = todo.name;
	}

	const onChangeStatus = (event: Event) => {
		const { checked } = event.target as HTMLInputElement;
		const newTodo: ITodo = {
			...todo,
			status: checked ? 'completed' : 'uncompleted'
		};
		dispatchChangeStatus('changeStatus', newTodo);
	};

	const onRemove = () => {
		dispatchRemove('remove', todo);
	};

	const onToggleEditingMode = () => {
		isEditing = !isEditing;
	};

	const onChangeEditingTodoName = (event: Event) => {
		const { value } = event.target as HTMLInputElement;
		editingTodoName = value;
	};

	const onUpdateTodoName = (event: Event) => {
		dispatchChangeName('changeName', {
			...todo,
			name: editingTodoName
		});
		isEditing = false;
	};
</script>

<li class="todo-item-container">
	<input
		type="checkbox"
		class="todo-item-checkbox"
		id="task-{todo.id}"
		checked={todo.status === 'completed'}
		on:change={onChangeStatus}
	/>

	{#if isEditing}
		<form
			class="todo-item-edit-input-container"
			id="updating-todo-{todo.id}"
			on:submit|preventDefault={onUpdateTodoName}
		>
			<input
				autofocus
				value={editingTodoName}
				on:change={onChangeEditingTodoName}
				class="todo-item-edit-input"
				required
			/>
		</form>
	{:else}
		<label class="todo-item-label clickable" for="task-{todo.id}">{todo.name}</label>
	{/if}

	<div class="todo-item-button-container">
		{#if isEditing}
			<button on:click={onUpdateTodoName} type="submit" form="updating-todo-{todo.id}">
				<Fa icon={faCheck} />
			</button>
			<button on:click={onToggleEditingMode}>
				<Fa icon={faXmark} />
			</button>
		{:else}
			<button on:click={onToggleEditingMode}>
				<Fa icon={faPenToSquare} />
			</button>
			<button on:click={onRemove}>
				<Fa icon={faTrash} />
			</button>
		{/if}
	</div>
</li>

<style lang="scss">
	.todo-item-container {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}

	.todo-item-checkbox {
		cursor: pointer;
		display: none;
		height: auto;
		margin-bottom: 0;
		padding: 0;
		width: auto;

		&:checked + label {
			text-decoration: line-through;
		}

		&:checked + label:before {
			background: #0079bf;
		}

		&:checked + label:after {
			border: solid #fff;
			border-width: 0 2px 2px 0;
			content: '';
			display: block;
			height: 14px;
			left: 9px;
			position: absolute;
			top: 2px;
			-webkit-transform: rotate(45deg);
			transform: rotate(45deg);
			width: 6px;
		}
	}

	.todo-item-label {
		cursor: pointer;
		position: relative;

		&::before {
			background-color: initial;
			border: 2px solid #0079bf;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0 -15px 10px -12px rgba(0, 0, 0, 0.05);
			content: '';
			display: inline-block;
			margin-right: 10px;
			padding: 10px;
			vertical-align: middle;
		}
	}

	.todo-item-button-container {
		button {
			background-color: transparent;
			border: none;
			cursor: pointer;

			&:not(:first-child) {
				margin-left: 4px;
			}
		}
	}

	.todo-item-edit-input-container {
		border: 1px solid #eaeaea;
		width: calc(100% - 50px);
		border-radius: 4px;
	}

	.todo-item-edit-input {
		width: 100%;
		padding: 8px;
		outline: none;
		border: none;
	}
</style>

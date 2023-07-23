<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa/src/fa.svelte';

	import { faListCheck } from '@fortawesome/free-solid-svg-icons';

	export let value: string;

	const dispatch = createEventDispatcher<{ submit: { todoName: string } }>();

	const onSubmit = () => {
		dispatch('submit', {
			todoName: value
		});
	};
</script>

<form class="todo-form-container" on:submit|preventDefault={onSubmit}>
	<Fa icon={faListCheck} />
	<input
		type="text"
		class="todo-form-input"
		autofocus
		required
		placeholder="Add your todo"
		bind:value
		maxlength="35"
	/>
	<button class="todo-form-submit-button" type="submit">Add</button>
</form>

<style lang="scss">
	.todo-form-container {
		align-items: center;
		background: #edeef0;
		border-radius: 30px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 25px;
		padding-left: 20px;
	}

	.todo-form-input {
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

	.todo-form-submit-button {
		background: #ff5945;
		border-radius: 40px;
		color: #fff;
		cursor: pointer;
		font-size: 16px;
		padding: 16px 50px;
		border: none;
	}
</style>

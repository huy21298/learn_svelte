<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';

	import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
</script>

<li class="todo-item-container">
	<input type="checkbox" class="todo-item-checkbox" id="task-201" />
	<label class="todo-item-label clickable" for="task-201">123123</label>
	<div class="todo-item-button-container">
		<button>
			<Fa icon={faPenToSquare} />
		</button>

		<button>
			<Fa icon={faTrash} />
		</button>
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
</style>

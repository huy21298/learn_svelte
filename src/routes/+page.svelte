<script lang="ts">
	const navItems = [
		{
			href: '/todo',
			label: 'Todo list'
		},
		{
			href: '/memory_game',
			label: 'Memory game'
		},
		{
			href: '/products',
			label: 'Products'
		}
	];
</script>

<div>Welcome page</div>
<ul>
	{#each navItems as nav (nav.href)}
		<li>
			<a href={nav.href}>{nav.label}</a>
		</li>
	{/each}
</ul>

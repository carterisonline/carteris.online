<script>
	export let placeholder, href, logoPath, description, name;
</script>

{#if placeholder}
	<div
		class="outline outline-1 outline-slate-700 rounded-sm bg-gradient-to-br from-transparent to-slate-800 shadow-lg"
		aria-hidden="true"
	/>
{:else}
	<button
		{href}
		type="button"
		tabindex="0"
		class="col backdrop-blur-xl py-3 px-4
		outline outline-1 outline-indigo-500 rounded-sm
		bg-gradient-to-br from-transparent to-indigo-900 shadow-lg
		hover:bg-indigo-900 hover:outline-white transition-all duration-200"
		on:click={(window.location.href = href)}
		aria-describedby={`This button takes you to ${name}, with the description: ${description}.`}
	>
		<img src={logoPath} class="mt-3 ml-2 sm:mb-2 mb-0" alt={`${name} logo`} />
		<caption class="m-2 italic text-xs">{description}</caption>
	</button>
{/if}

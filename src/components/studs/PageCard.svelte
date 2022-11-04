<script>
	export let placeholder, href, logoPath, description;
</script>

{#if placeholder}
	<div
		class="m-2 col backdrop-blur-xl py-3 px-4
		font-italic text-xs outline outline-1 outline-slate-700 rounded-sm pt-1.5 pl-2 pr-2
		bg-gradient-to-br from-transparent to-slate-800 shadow-lg max-w-full items-start"
	/>
{:else}
	<a
		href={href}
		class="m-2 col backdrop-blur-xl py-3 px-4
		font-italic text-xs outline outline-1 outline-indigo-500 rounded-sm pt-1.5 pl-2 pr-2
		bg-gradient-to-br from-transparent to-indigo-900 shadow-lg sm:w-fit max-w-full items-start"
	>
		<div class="w-full sm:mb-2 h-0 sm:h-auto">
			<img src={logoPath} class="w-32 mt-3 ml-2" alt={description}/>
		</div>
		<p class="m-2 italic mt-14 sm:mt-0">{description}</p>
	</a>
{/if}
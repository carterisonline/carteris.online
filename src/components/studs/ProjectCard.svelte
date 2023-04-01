<script>
	export let href;
	export let logoPath;
	export let title;
	export let header;
	export let color;
	export let wip;

	const classCond = (...classes) => classes.filter(Boolean).join(' ');
</script>

<a
	{href}
	class={classCond([
		`space-y-3 sm:py-8 px-4 py-4 md:m-2 my-2 col outline outline-1 ${color} rounded-sm bg-gradient-to-br from-transparent hover:outline-white transition-all duration-200 backdrop-blur-sm md:backdrop-blur-none`,
	])}
	type="button"
	role="button"
	tabindex="0"
	{title}
	aria-label="{title} - {header}"
>
	<div class="flex justify-items-start items-start space-x-4">
		<img
			src={logoPath}
			class="w-12 mt-1 border border-opacity-30 rounded-md border-white {color}-bg"
			alt={`Logo for ${title}`}
			role="presentation"
		/>
		<div class="col items-start" aria-hidden="true">
			{#if wip}
				<span class="flex space-x-2 items-center" aria-hidden="true">
					<p class="text-2xl font-black" aria-hidden="true">
						{title}
					</p>
					<p class="bg-red-600 text-sm px-2 rounded-full" aria-hidden="true">
						WIP
					</p>
				</span>
			{:else}
				<p class="text-2xl font-black" aria-hidden="true">
					{title}
				</p>
			{/if}
			<p class="text-slate-200" aria-hidden="true">{header}</p>
		</div>
	</div>

	<p class="text-center text-lg px-8" role="contentinfo"><slot /></p>
</a>

<style lang="postcss">
	.orange {
		@apply outline-orange-500 to-orange-800 hover:bg-orange-700 focus:bg-orange-700;
	}
	.indigo {
		@apply outline-indigo-500 to-indigo-900 hover:bg-indigo-900 focus:bg-indigo-900;
	}
	.green {
		@apply outline-emerald-500 to-emerald-900 hover:bg-emerald-700 focus:bg-emerald-700;
	}
	.red {
		@apply outline-red-500 to-red-900 hover:bg-red-900 focus:bg-red-900;
	}
	.blue {
		@apply outline-sky-500 to-sky-900 hover:bg-sky-600 focus:bg-sky-600;
	}
	.fuchsia {
		@apply outline-fuchsia-500 to-fuchsia-900 hover:bg-fuchsia-600 focus:bg-fuchsia-600;
	}

	.orange-bg {
		@apply bg-orange-900;
	}
	.indigo-bg {
		@apply bg-indigo-900;
	}
	.green-bg {
		@apply bg-emerald-900;
	}
	.red-bg {
		@apply bg-red-900;
	}
	.blue-bg {
		@apply bg-sky-900;
	}
	.fuchsia-bg {
		@apply bg-fuchsia-900;
	}
</style>

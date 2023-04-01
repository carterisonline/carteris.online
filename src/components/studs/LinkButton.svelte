<script>
	export let href;
	export let rel;
</script>

<button
	class="p-2 backdrop-blur-xl outline outline-1 outline-indigo-600 rounded-sm bg-opacity-50 bg-indigo-900 flex-1 text-center flex justify-center items-center space-x-2 hover:bg-gradient-to-br from-white to-indigo-400 hover:text-indigo-900 transition-all duration-150"
	type="button"
	tabindex="0"
	on:click={(window.location.href = href)}
	aria-describedby={rel}
>
	<slot />
</button>

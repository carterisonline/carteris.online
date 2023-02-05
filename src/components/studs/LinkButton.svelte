<script>
	export let href;
	export let rel;
</script>

<a
	class="p-2 backdrop-blur-xl outline outline-1 outline-indigo-600 rounded-sm bg-opacity-50 bg-indigo-900 flex-1 text-center flex justify-center items-center space-x-2"
	{href}
	{rel}
>
	<slot />
</a>

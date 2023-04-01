<script>
	import '../components.css';

	let text = '';

	function encode(text) {
		return text
			.toLowerCase()
			.split('')
			.map(c => c.charCodeAt(0) - 96)
			.map(c => {
				if (c < 1 || c > 26) {
					return '__';
				}

				return c.toString();
			})
			.map(c => c.padStart(2, '0'))
			.join(' ');
	}
</script>

<form
	class="col md:justify-center h-full text-white md:space-y-0 space-y-5"
	role="region"
>
	<label
		for="inputtext"
		class="w-full h-32 md:h-auto w-dynamic backdrop-blur-lg card md:rounded-b-none md:shadow-none"
	>
		<p class="mt-5 ml-5 md:m-0">Input text</p>
		<textarea
			id="inputtext"
			name="inputtext"
			aria-controls="encodedtext"
			placeholder="The quick brown fox jumps over the lazy dog."
			class="textarea-mut w-full mt-5"
			bind:value={text}
		/>
	</label>
	<label
		for="encodedtext"
		class="w-full h-32 md:h-auto mb-1 w-dynamic backdrop-blur-lg card md:rounded-t-none"
	>
		<p class="mt-5 ml-5 md:m-0">Text will be encoded as you type.</p>
		<textarea
			id="encodedtext"
			name="encodedtext"
			placeholder="Encoded text ..."
			class="textarea-static w-full mt-5"
			aria-live="polite"
			disabled
			readonly>{encode(text)}</textarea
		>
	</label>
</form>

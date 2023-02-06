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

<div class="col sm:justify-center h-full">
	<div class="col card w-dynamic backdrop-blur-lg">
		<textarea
			placeholder="The quick brown fox jumps over the lazy dog."
			class="textarea-mut sm:mb-20 w-full h-32 sm:h-auto mb-1"
			bind:value={text}
		/>

		<div class="w-full sm:mb-2 h-0 sm:h-auto">
			<p class="sm:text-slate-100 text-transparent font-thin">
				Text will be encoded as you type.
			</p>
		</div>

		<textarea
			placeholder="Encoded text ..."
			class="textarea-static w-full"
			readonly>{encode(text)}</textarea
		>
	</div>
</div>

<style>
</style>

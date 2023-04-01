<script>
	export let name;
	export let description;

	const displayName = `${name}()`;
</script>

<article
	class="grid grid-cols-1 gap-2 rounded-xl saturated-borders ml-5 text-indigo-900 lg:p-6 p-3 sm:max-w-full max-w-[20rem]"
>
	<div class="flex flex-col justify-center items-center">
		<h1 class="text-2xl headline shadow-xl w-full text-center">
			{displayName}
		</h1>
	</div>

	<p class="text-lg text-black text-center">
		{description}
	</p>
</article>

<style>
	.saturated-borders {
		position: relative;
		backdrop-filter: saturate(2);
	}

	.saturated-borders::before {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border: solid 4px #fff5;
		border-radius: 0.75rem;
		backdrop-filter: saturate(3);
		--fill: linear-gradient(red, red);
		mask-composite: xor;
		mask: var(--fill) padding-box exclude, var(--fill);
		content: '';
	}

	.headline {
		font-weight: 800;
		font-family: monospace;
	}

	h1.headline {
		padding: 0.5rem;
		padding-left: 1em;
		background-color: #fff5;
		backdrop-filter: saturate(3);
		border-radius: 0.5em;
	}

	h1.headline::before {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border: solid 4px #fff5;
		border-radius: 0.75rem;
		backdrop-filter: saturate(1.5);
		--fill: linear-gradient(red, red);
		mask-composite: xor;
		mask: var(--fill) padding-box exclude, var(--fill);
		content: '';
	}
</style>

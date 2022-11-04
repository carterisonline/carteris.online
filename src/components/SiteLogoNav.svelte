<script>
	import '../components.css';
	import PageCard from './studs/PageCard.svelte';

	import {
		Popover,
		PopoverButton,
		PopoverPanel,
		Transition,
	} from '@rgossiaux/svelte-headlessui';

	const classCond = (...classes) => classes.filter(Boolean).join(' ');
</script>

<Popover defaultOpen class="relative" let:open>
	<PopoverButton
		class={classCond(
			open && 'text-indigo-300',
			'font-bold text-lg hover:text-indigo-300 transition-all row'
		)}
	>
		<div class="popover-button-logo flex" {open}>
			carteris<span class="text-slate-400">.</span>online
		</div>
	</PopoverButton>
	<Transition
		show={open}
		enter="transition duration-200"
		enterFrom="opacity-0 translate-y-1"
		enterTo="opacity-100 translate-y-0"
		leave="transition duration-150"
		leaveFrom="opacity-100 translate-y-0"
		leaveTo="opacity-0 translate-y-1"
	>
		<PopoverPanel
			unmount={false}
			class="absolute z-50 w-screen h-screen sm:-left-16 -left-11"
		>
			<div
				class="m-3 sm:m-8 mt-12 sm:mt-14 sm:w-fit h-fit grid sm:grid-cols-2 sm:grid-rows-2 grid-rows-4 grid-cols-1
					px-2 py-2 text-white outline outline-1 outline-slate-900 bg-opacity-60 rounded-md backdrop-blur-md shadow-2xl
					bg-gradient-to-b from-slate-800 to-slate-900"
			>
				<PageCard
					description="Encodes text into alphabetic positioning numbers"
					logoPath="/abcdecode.avif"
					href="/abcdecode"
				/>
				<PageCard placeholder />
				<PageCard placeholder />
				<PageCard placeholder />
			</div>
		</PopoverPanel>
	</Transition>
</Popover>

<style>
	.popover-button-logo::after {
		content: url(/chevron.svg);
		stroke: white;

		display: flex;
		margin-left: 0.75rem;
		width: 2rem;

		rotate: 0;
		transition: rotate ease-out 0.1s;
	}

	.popover-button-logo:hover::after,
	.popover-button-logo[open='true']::after {
		rotate: 90deg;
		transition: rotate ease-in 0.1s;
	}
</style>

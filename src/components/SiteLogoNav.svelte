<script>
	import '../components.css';
	import PageCard from './studs/PageCard.svelte';

	import {
		Popover,
		PopoverButton,
		PopoverPanel,
		Transition,
	} from '@rgossiaux/svelte-headlessui';

	import LinkButton from './studs/LinkButton.svelte';
	import HouseSolid from './icons/HouseSolid.svelte';
	import Github from './icons/Github.svelte';
	import Twitter from './icons/Twitter.svelte';
	import Mastodon from './icons/Mastodon.svelte';

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
			class="absolute z-50 w-screen h-screen sm:-left-16 -left-4"
		>
			<div
				class="m-2 sm:m-8 mt-8 sm:mt-14 sm:w-fit h-fit flex flex-col
					px-2 py-2 text-white outline outline-1 outline-slate-900 bg-opacity-60 rounded-md backdrop-blur-md shadow-2xl
					bg-gradient-to-b from-slate-800 to-slate-900"
			>
				<div class="grid sm:grid-cols-2 sm:grid-rows-2 grid-rows-4 grid-cols-1">
					<PageCard
						description="Encodes text into alphabetic positioning numbers"
						logoPath="/abcdecode.avif"
						href="/abcdecode"
					/>
					<PageCard placeholder />
					<PageCard placeholder />
					<PageCard placeholder />
				</div>
				<div
					class="sm:row w-full items-stretch gap-2 grid grid-rows-2 grid-cols-2 p-2"
				>
					<LinkButton href="/">
						<HouseSolid />
						<p>Home</p>
					</LinkButton>
					<LinkButton href="https://github.com/carterisonline">
						<Github />
						<p>GitHub</p>
					</LinkButton>
					<LinkButton href="https://twitter.com/carterisonline">
						<Twitter />
						<p>Twitter</p>
					</LinkButton>
					<LinkButton href="https://mas.to/@carterr" rel="me">
						<Mastodon />
						<p>Mastodon</p>
					</LinkButton>
				</div>
			</div>
		</PopoverPanel>
	</Transition>
</Popover>

<style>
	.popover-button-logo::after {
		content: url(/chevron.svg);
		stroke: white;

		display: flex;
		margin-left: 0.25rem;
		width: 2rem;

		rotate: 0;
		transition: rotate ease-out 0.1s;
	}

	@media (min-width: 640px) {
		.popover-button-logo::after {
			margin-left: 0.75rem;
		}
	}

	.popover-button-logo:hover::after,
	.popover-button-logo[open='true']::after {
		rotate: 90deg;
		transition: rotate ease-in 0.1s;
	}
</style>

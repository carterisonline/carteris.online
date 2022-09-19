import solidheadless from 'solid-headless';
const { Popover, PopoverButton, Transition, PopoverPanel } = solidheadless;
import '../components.css';

const classCond = (...classes) => classes.filter(Boolean).join(' ');

function PageCard({ description, logoPath, href, placeholder }) {
	if (placeholder) {
		return (
			<a
				href={href}
				class="m-2 col backdrop-blur-xl py-3 px-4
				font-italic text-xs outline outline-1 outline-slate-700 rounded-sm pt-1.5 pl-2 pr-2
				bg-gradient-to-br from-transparent to-slate-800 shadow-lg max-w-full items-start"
			></a>
		);
	} else {
		return (
			<a
				href={href}
				class="m-2 col backdrop-blur-xl py-3 px-4
				font-italic text-xs outline outline-1 outline-indigo-500 rounded-sm pt-1.5 pl-2 pr-2
				bg-gradient-to-br from-transparent to-indigo-900 shadow-lg sm:w-fit max-w-full items-start"
			>
				<div class="w-full sm:mb-2 h-0 sm:h-auto">
					<img src={logoPath} class="w-32 mt-3 ml-2"></img>
				</div>
				<p class="m-2 italic mt-14 sm:mt-0">{description}</p>
			</a>
		);
	}
}

export default function SiteLogoNav() {
	return (
		<Popover defaultOpen class="relative">
			{({ isOpen }) => (
				<>
					<PopoverButton
						class={classCond(
							isOpen() && 'text-indigo-300',
							'font-bold text-lg hover:text-indigo-300 transition-all row'
						)}
					>
						carteris<span class="text-slate-400">.</span>online
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1"
							stroke="currentColor"
							class={classCond(
								isOpen() && 'text-indigo-300',
								'ml-3 w-8 h-8 hover:rotate-90 hover:mt-2 hover:mb-0 mb-2 transition-all ease-out duration-200'
							)}
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8.25 4.5l7.5 7.5-7.5 7.5"
							></path>
						</svg>
					</PopoverButton>
					<Transition
						show={isOpen()}
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
								></PageCard>
								<PageCard placeholder />
								<PageCard placeholder />
								<PageCard placeholder />
							</div>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	);
}

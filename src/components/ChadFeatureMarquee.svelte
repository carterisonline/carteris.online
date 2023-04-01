<script>
	import Marquee from 'svelte-fast-marquee';
	import ChadFeatureCard from './ChadFeatureCard.svelte';
	let play = true;
</script>

<Marquee pauseOnHover={true} speed={20} {play}>
	<aside class="flex text-white justify-evenly">
		<div class="flex flex-col gap-5 items-stretch">
			<ChadFeatureCard
				name="Conversational"
				description="Have a conversation"
			/>
			<ChadFeatureCard
				name="Search"
				description="Answer questions with context and cited sources using the internet"
			/>
		</div>
		<div class="flex flex-col gap-5 items-stretch">
			<ChadFeatureCard
				name="Locate"
				description="Find details about a store, business or location"
			/>

			<ChadFeatureCard
				name="Rationalize"
				description="Answer logical and historical questions"
			/>
		</div>
		<div class="flex flex-col gap-5 items-stretch">
			<ChadFeatureCard
				name="Link"
				description="Find a link to a website or documentation"
			/>
			<ChadFeatureCard
				name="Browse"
				description="Get context and information by browsing a website"
			/>
		</div>
		<div class="flex flex-col gap-5 items-stretch">
			<ChadFeatureCard
				name="Query"
				description="Write and send queries to APIs"
			/>
			<ChadFeatureCard
				name="Integrate"
				description="Write a new feature or integrate with an existing service"
			/>
		</div>
	</aside>
</Marquee>

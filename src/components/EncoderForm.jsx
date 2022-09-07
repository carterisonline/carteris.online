import { createSignal } from 'solid-js';

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

export default function EncoderForm() {
	const [text, setText] = createSignal('');

	return (
		<div class="flex flex-col items-center h-full">
			<div class="flex flex-row items-start xl:w-2/3 w-full md:w-5/6 mb-20">
				<span class="font-mono font-bold text-slate-400 text-4xl mt-4">
					<a href="/">~/home/</a>
				</span>
				<img src="/abcdecode.png" />
			</div>

			<div class="flex flex-col items-center xl:w-2/3 w-full md:w-5/6 h-1/4 bg-black bg-opacity-10 rounded-xl p-10">
				<textarea
					name="text"
					type="text"
					placeholder="The quick brown fox jumps over the lazy dog."
					class="focus:transition-all ease-in bg-black bg-opacity-30 focus:outline outline-0 focus:outline-2 focus:outline-indigo-800 outline-slate-900
					mb-20 p-4 text-white  shadow-xl w-full"
					onInput={e => setText(encode(e.currentTarget.value))}
				></textarea>

				<div class="flex flex-row items-start w-full mb-2">
					<p class="text-slate-100 font-thin">
						Text will be encoded as you type.
					</p>
				</div>
				<textarea
					name="text"
					type="text"
					id="output"
					placeholder="Encoded text ..."
					class="font-mono bg-gray-700 bg-opacity-30 outline-slate-700 outline-2 outline-dashed
					p-4 text-white w-full"
					readonly
				>
					{text}
				</textarea>
			</div>
		</div>
	);
}

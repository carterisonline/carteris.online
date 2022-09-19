import { createSignal } from 'solid-js';
import '../components.css';

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
		<div class="col p-8 sm:mt-16 mt-8">
			<div class="row w-dynamic mb-20">
				<span class="font-mono font-bold text-slate-400 text-3xl sm:text-4xl mt-2 sm:mt-4">
					<a href="/">~/carter/</a>
				</span>
				<img class="object-contain h-12 sm:h-14" src="/abcdecode.avif" />
			</div>

			<div class="col card w-dynamic h-1/4">
				<textarea
					placeholder="The quick brown fox jumps over the lazy dog."
					class="textarea-mut sm:mb-20 w-full h-32 sm:h-auto mb-1"
					onInput={e => setText(encode(e.currentTarget.value))}
				></textarea>

				<div class="w-full sm:mb-2 h-0 sm:h-auto">
					<p class="sm:text-slate-100 text-transparent font-thin">
						Text will be encoded as you type.
					</p>
				</div>

				<textarea
					placeholder="Encoded text ..."
					class="textarea-static w-full"
					readonly
				>
					{text}
				</textarea>
			</div>
		</div>
	);
}

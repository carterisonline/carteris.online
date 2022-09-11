/* eslint-disable @typescript-eslint/no-var-requires */
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
	plugins: [
		require('cssnano'),
		require('autoprefixer'),
		purgecss({
			content: ['./src/**/*.jsx', './src/**/*.astro'],
		}),
	],
};

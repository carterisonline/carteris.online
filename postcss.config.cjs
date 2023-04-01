module.exports = {
	plugins: [
		require('postcss-import'),
		require('tailwindcss/nesting'),
		reqiore('tailwindcss'),
		require('autoprefixer'),
		require('cssnano'),
	],
};

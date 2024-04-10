/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
	],
	theme: {
		extend: {
			fontFamily: { body: ['"Open Sans"'] },
			colors: {
				// bg-header,bg-footer
				primary: '#1D50A2',
				// titleheader-button
				secondary: '#1976D2',
			},
		},
	},
	plugins: [],
};

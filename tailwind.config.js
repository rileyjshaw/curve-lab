/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/theme');

export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/components/(slider|tooltip|button).{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				cobalt: {
					1000: '#032CA5',
					700: '#1246E0',
					600: '#265CFF',
					500: '#265CFF',
					400: '#658DFD',
					300: '#93AEFF',
					200: '#C1D2FE',
					100: '#E3EBFF',
					50: '#F5F8FF',
				},
			},
		},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: '#265CFF',
							foreground: '#fff',
						},
						focus: '#658DFD',
					},
				},
				dark: {
					colors: {
						primary: {
							DEFAULT: '#265CFF',
							foreground: '#fff',
						},
						focus: '#658DFD',
					},
				},
			},
		}),
	],
};

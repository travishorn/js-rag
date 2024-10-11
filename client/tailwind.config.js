import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'white-linen': {
					50: '#f8f6f4',
					100: '#f0ebe5', // conversation background
					200: '#dfd4c9',
					300: '#cbb8a6',
					400: '#b59882',
					500: '#a68069',
					600: '#99705d',
					700: '#7f5c4f',
					800: '#684c44',
					900: '#553f39',
					950: '#2d201d'
				},
				'snow-flurry': {
					50: '#f0ffe6',
					100: '#e2ffd3', // sender bubble background
					200: '#b8ff97',
					300: '#8bfb5b',
					400: '#64f12a',
					500: '#42d70b',
					600: '#2fac04',
					700: '#258308',
					800: '#22670d',
					900: '#1e5710',
					950: '#0a3102'
				}
			}
		}
	},
	plugins: [typography]
};

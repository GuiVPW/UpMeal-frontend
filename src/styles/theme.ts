import '@emotion/react'

export const theme = {
	colors: {
		primary: '#22bcb5',
		secondary: '#fe7240'
	},
	background: {
		disabled: '#EFEFEF',
		main: '#f0f0f5',
		secondary: '#d7d7d7',
		light: '#fff',
		foreground: '#F9FAFF'
	},
	text: {
		main: '#13131A',
		description: '#656A80',
		link: '#4a90e2',
		light: '#fff'
	},
	tags: {
		black: '#000000',
		white: '#FFFFFF',
		yellow: '#F49F0E',
		red: '#FF4336',
		green: '#00C48C'
	},
	border: {
		thin: '#F0F0F5',
		darker: '#E2E2EA',
		colored: '#F49F0E'
	},
	input: {
		background: '#F9FAFF',
		placeholder: '#a0a0b2',
		text: '#6c6c80'
	}
}

export type StyledTheme = typeof theme

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface Theme extends StyledTheme {}
}

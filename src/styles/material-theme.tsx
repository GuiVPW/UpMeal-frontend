import { createTheme, ThemeOptions } from '@mui/material/styles'

import { pxToRem } from '../utils/px-to-rem'
import { theme as colorTheme, StyledTheme } from './theme'

declare module '@mui/material/styles' {
	interface TypographyVariants {
		display1: React.CSSProperties
		display2: React.CSSProperties
		display3: React.CSSProperties
	}

	interface TypographyVariantsOptions {
		display1?: React.CSSProperties
		display2?: React.CSSProperties
		display3?: React.CSSProperties
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		display1: true
		display2: true
		display3: true
	}
}

const materialBaseTheme = (theme: StyledTheme): ThemeOptions => ({
	palette: {
		primary: {
			main: theme.colors.primary
		},
		secondary: {
			main: theme.colors.secondary
		},
		text: {
			primary: theme.text.main,
			secondary: theme.text.description
		},
		common: {
			black: theme.tags.black,
			white: theme.tags.white
		},
		background: {
			paper: theme.background.main
		}
	},
	typography: {
		display1: {
			fontSize: pxToRem(40),
			fontWeight: 700
		},
		display2: {
			fontSize: pxToRem(30),
			fontWeight: 700
		},
		display3: {
			fontSize: pxToRem(24),
			fontWeight: 600
		},
		h1: {
			fontSize: pxToRem(22),
			fontWeight: 700
		},
		h2: {
			fontSize: pxToRem(20),
			fontWeight: 400
		},
		h3: {
			fontSize: pxToRem(18)
		},
		h4: {
			fontSize: pxToRem(16)
		},
		h5: {
			fontSize: pxToRem(15)
		},
		button: {
			fontSize: pxToRem(20)
		},
		body1: {
			fontSize: pxToRem(14)
		},
		body2: {
			fontSize: pxToRem(12)
		}
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true
			},
			styleOverrides: {
				root: {
					textTransform: 'uppercase',
					fontSize: pxToRem(14),
					fontWeight: 600
				},
				contained: {
					padding: '12px 16px',
					color: theme.text.light
				},
				text: {
					'& .MuiButton-label': {
						justifyContent: 'space-between'
					}
				}
			}
		},
		MuiInput: {
			defaultProps: {
				disableUnderline: true
			},
			styleOverrides: {
				root: {
					border: `1px solid ${theme.border.thin}`,
					fontSize: pxToRem(14),
					backgroundColor: theme.input.background,
					color: theme.input.text
				},
				input: {
					'&::placeholder': {
						color: theme.input.placeholder
					}
				}
			}
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: theme.text.link
				}
			}
		}
	}
})

export const materialTheme = createTheme(materialBaseTheme(colorTheme))

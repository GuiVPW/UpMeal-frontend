import { AppProps } from 'next/app'
import Head from 'next/head'

import { CacheProvider, EmotionCache, Global } from '@emotion/react'
import { ThemeProvider as StyledProvider } from '@emotion/react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/system'

import Layout from '../components/Layout'
import createEmotionCache from '../lib/emotionCache.config'
import { GlobalStyle } from '../styles/global.styles'
import { materialTheme } from '../styles/material-theme'
import { theme } from '../styles/theme'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache
}

export const App = (props: MyAppProps) => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>UpMeal</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={materialTheme}>
				<StyledProvider theme={theme}>
					<CssBaseline />
					<Global styles={GlobalStyle} />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</StyledProvider>
			</ThemeProvider>
		</CacheProvider>
	)
}

export default App

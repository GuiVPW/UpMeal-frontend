import { AppProps } from 'next/app'
import Head from 'next/head'

import { CacheProvider, EmotionCache, Global } from '@emotion/react'
import { ThemeProvider as StyledProvider } from '@emotion/react'

import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/system'
import ptBrLocale from 'date-fns/locale/pt-BR'
import { StoreContext } from 'storeon/react'

import Layout from '../components/Layout'
import createEmotionCache from '../lib/emotionCache.config'
import { store } from '../state/store'
import { GlobalStyle } from '../styles/global.styles'
import { materialTheme } from '../styles/material-theme'
import { theme } from '../styles/theme'

import 'leaflet/dist/leaflet.css'

const clientSideEmotionCache = createEmotionCache()

export const App = ({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache
}: AppProps & { emotionCache?: EmotionCache }) => {
	return (
		<StoreContext.Provider value={store}>
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
							<LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
								<Component {...pageProps} />
							</LocalizationProvider>
						</Layout>
					</StyledProvider>
				</ThemeProvider>
			</CacheProvider>
		</StoreContext.Provider>
	)
}

export default App

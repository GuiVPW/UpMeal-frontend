import { css } from '@mui/styled-engine'

export const GlobalStyle = css`
	html {
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	* {
		margin: 0;
		padding: 0;
		&,
		&::before,
		&::after {
			box-sizing: border-box;
		}
	}

	body {
		color: #1d2b4e;
		font-size: 0.875rem;
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
		font-weight: 400;
		line-height: 1.43;
		overflow-x: hidden;
		letter-spacing: 0.01071em;
		background-color: #f9faff;
	}

	button {
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
	}

	body::backdrop {
		background-color: #fafafa;
	}

	a {
		font-size: inherit;
		text-decoration: none;
		color: #4a90e2;
	}

	form {
		width: 100%;
	}
`

export default GlobalStyle

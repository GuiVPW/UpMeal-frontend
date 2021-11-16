import styled from '@emotion/styled'
import { Toolbar, Typography } from '@mui/material'

export const Container = styled(Toolbar)`
	height: 64px;
	padding: 0px 15px 0;

	@media only screen and (min-width: 600px) {
		&.MuiToolbar-gutters {
			padding: 0 24px;
		}
	}

	@media only screen and (min-width: 960px) {
		&.MuiToolbar-gutters {
			padding: 0 66px;
		}
	}

	@media only screen and (min-width: 1280px) {
		&.MuiToolbar-gutters {
			padding: 0 72px;
		}
	}
`

export const Title = styled(Typography)`
	font-weight: 600;
	margin-top: 0;
`

export const Content = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	justify-content: space-between;
	flex: 1 1 auto;
`

export const RightContent = styled.nav`
	display: flex;
	align-items: center;
	height: 100%;
`

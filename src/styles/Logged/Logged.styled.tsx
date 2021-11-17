import styled from '@emotion/styled'
import { Paper, Stack } from '@mui/material'

export const Surface = styled(Paper)`
	padding: 40px;
	padding-top: 0;
	width: 100%;
	height: 100%;
`

export const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 400px;
	object-fit: cover;
`

export const MapContainer = styled(Stack)(({ theme }) => ({
	background: theme.background.light,
	border: theme.border.darker,
	borderRadius: '20px'
}))

export const MapFooter = styled.footer`
	padding: 20px 0;
	text-align: center;
`

export const FoodContainer = styled(Stack)(({ theme }) => ({
	width: '100%',
	padding: '24px',
	border: theme.border.darker,
	height: 'auto',
	marginBottom: '16px',

	'.MuiOutlinedInput-root': {
		backgroundColor: theme.input.background
	}
}))

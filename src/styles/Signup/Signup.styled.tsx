import styled from '@emotion/styled'
import { Paper, Box } from '@mui/material'

export const Surface = styled(Paper)`
	display: flex;
	width: 100%;
	flex-direction: column;

	margin-top: 0;

	@media only screen and (min-width: 600px) {
		padding: 20px 40px;
		justify-content: center;
	}
`

export const Form = styled.form`
	width: 100%;
	padding: 24px;

	.MuiOutlinedInput-input {
		background-color: ${props => props.theme.input.background};
	}
`

export const Content = styled.section`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	padding: 24px;
`

export const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 150px;
	height: 150px;
	margin-bottom: 24px;
`

export const PhotoContainer = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	position: relative;

	.image-selector {
		font-size: 18px;
		position: absolute;
		padding: 4px;
		border-radius: 50%;
		background: ${props => props.theme.background.main};
		border: 1px solid ${props => props.theme.border.colored};
		bottom: 0;
		right: 90px;
		height: 24px;
		color: ${props => props.theme.colors.secondary};
		cursor: pointer;
	}

	input {
		display: none;
	}
`

export const ImageSelector = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 20px;
	padding: 16px;
	border: 2px solid ${props => props.theme.border.darker};
	background-color: ${props => props.theme.background.light};
	border-style: dashed;
	cursor: pointer;
`

export const ChosenImage = styled.img`
	width: 100%;
	height: 100%;
	max-width: 400px;
	max-height: 400px;
`

import styled from '@emotion/styled'
import { Paper } from '@mui/material'

export const Surface = styled(Paper)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	margin-top: 0;
	padding: 40px;
`

export const Form = styled.form`
	width: 100%;
	max-width: 450px;
	padding: 24px;

	.MuiOutlinedInput-input {
		background-color: ${props => props.theme.input.background};
	}
`

export const Content = styled.section`
	width: 100%;
	max-width: 380px;
	padding: 24px;
`

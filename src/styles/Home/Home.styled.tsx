import styled from '@emotion/styled'
import { Container } from '@mui/material'

export const FormSection = styled.section`
	width: 100%;
	max-width: 350px;
	margin-right: 30px;

	@media only screen and (max-width: 600px) {
		max-width: 100%;
	}
`

export const StyledForm = styled.form`
	margin-top: 0;
	@media only screen and (min-width: 600px) {
		margin-top: 100px;
	}
`

export const StyledContainer = styled(Container)`
	padding-left: 0;
	padding-right: 0;
`

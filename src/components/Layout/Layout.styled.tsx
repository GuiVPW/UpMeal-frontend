import styled from '@emotion/styled'

import { Container } from '../Container'

export const LayoutContainer = styled.main`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
`

export const Content = styled(Container)`
	display: flex;
	justify-content: center;
	padding: 60px 15px;

	@media only screen and (min-width: 768px) {
		padding: 20px;
	}
`

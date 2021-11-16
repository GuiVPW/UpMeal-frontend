import styled from '@emotion/styled'

import { Container } from '../Container'

export const LayoutContainer = styled.main`
	width: 100%;
	display: flex;
	justify-content: center;
`

export const Content = styled(Container)`
	display: flex;
	justify-content: center;
	padding: 60px 15px;
	margin: 0;

	@media only screen and (min-width: 768px) {
		padding: 0 20px;
		min-height: 100%;
	}
`

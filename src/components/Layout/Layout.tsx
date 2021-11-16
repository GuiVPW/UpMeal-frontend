import { FC } from 'react'

import { Header } from '../Header'
import { Content, LayoutContainer } from './Layout.styled'

export const Layout: FC = ({ children }) => {
	return (
		<LayoutContainer>
			<Header handleLogout={() => {}} />
			<Content maxWidth="md">{children}</Content>
		</LayoutContainer>
	)
}

export default Layout

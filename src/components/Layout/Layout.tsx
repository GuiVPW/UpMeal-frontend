import { FC, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useStoreon } from '../../hooks/useStoreon'
import { Header } from '../Header'
import { Content, LayoutContainer } from './Layout.styled'

export const Layout: FC = ({ children }) => {
	const { dispatch, shop } = useStoreon('shop')
	const router = useRouter()

	useEffect(() => {
		if (!shop) {
			router.push('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<LayoutContainer>
			<Header
				handleLogout={() => {
					dispatch('shop/signOut')
				}}
			/>
			<Content maxWidth="md">{children}</Content>
		</LayoutContainer>
	)
}

export default Layout

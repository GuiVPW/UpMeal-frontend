import { FC, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useStoreon } from '../../hooks/useStoreon'
import { Header } from '../Header'
import { Content, LayoutContainer } from './Layout.styled'

export const Layout: FC = ({ children }) => {
	const { dispatch, token, loadingShop } = useStoreon('token', 'loadingShop')
	const router = useRouter()

	useEffect(() => {
		if (!token && !loadingShop) {
			router.push('/')
		}
	}, [loadingShop, token])

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

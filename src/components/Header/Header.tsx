import Link from 'next/link'

import LogoutIcon from '@mui/icons-material/PowerSettingsNew'
import { AppBar, IconButton, Stack, Toolbar } from '@mui/material'

import { Container, Content, Title, RightContent } from './Header.styled'

export interface HeaderProps {
	handleLogout: () => void
	authenticated?: boolean
}

export const Header = ({ handleLogout, authenticated = false }: HeaderProps) => (
	<AppBar color="transparent" variant="outlined" position="static">
		<Toolbar>
			<Container>
				<Content>
					<Link href="/" passHref>
						<Title variant="h1">Up Meal</Title>
					</Link>
				</Content>
				{authenticated && (
					<RightContent>
						<Stack direction="row" alignItems="center" justifyContent="flex-end">
							<IconButton onClick={handleLogout}>
								<LogoutIcon />
							</IconButton>
						</Stack>
					</RightContent>
				)}
			</Container>
		</Toolbar>
	</AppBar>
)

export default Header

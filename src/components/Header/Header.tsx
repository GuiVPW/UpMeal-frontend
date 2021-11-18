import Link from 'next/link'

import LogoutIcon from '@mui/icons-material/PowerSettingsNew'
import { AppBar, IconButton, Toolbar } from '@mui/material'

import icon from '../../assets/icon.png'
import { Container, Content, Logo, RightContent } from './Header.styled'

export interface HeaderProps {
	handleLogout: () => void
	authenticated?: boolean
}

export const Header = ({ handleLogout, authenticated = false }: HeaderProps) => (
	<AppBar color="transparent" variant="outlined" elevation={0} position="static">
		<Toolbar>
			<Container>
				<Content>
					<Link href="/" passHref>
						<Logo src={icon} alt="icon-title" width={48} height={48} loading="eager" />
					</Link>
					{authenticated && (
						<RightContent>
							<IconButton onClick={handleLogout}>
								<LogoutIcon />
							</IconButton>
						</RightContent>
					)}
				</Content>
			</Container>
		</Toolbar>
	</AppBar>
)

export default Header

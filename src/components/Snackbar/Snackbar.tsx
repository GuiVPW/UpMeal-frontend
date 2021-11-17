import React from 'react'

import { AlertColor, Snackbar as MuiSnackbar } from '@mui/material'

import Alert from '../Alert'

export interface SnackbarProps {
	open?: boolean
	handleClose: () => void
	type?: AlertColor
}

export interface AlertState {
	open?: boolean
	message: string
}

export const Snackbar: React.FC<SnackbarProps> = ({
	open = false,
	handleClose,
	type,
	children
}) => (
	<MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
		<Alert onClose={handleClose} severity={type} sx={{ width: '100%' }} variant="filled">
			{children}
		</Alert>
	</MuiSnackbar>
)

export default Snackbar

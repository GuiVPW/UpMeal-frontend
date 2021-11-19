/* eslint-disable indent */
import React from 'react'

import { Close as CloseIcon } from '@mui/icons-material'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import {
	Button,
	ButtonProps,
	Dialog,
	DialogProps,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
	Box,
	IconButton
} from '@mui/material'

// eslint-disable-next-line import/no-cycle
import * as S from './Modal.style'

interface FooterProps {
	finishButton?: boolean
	cancelButton?: boolean
}

export type ModalProps = {
	open: boolean
	onClose: () => void
	title?: React.ReactNode
	body?: string
	children?: React.ReactNode
	okText?: string
	cancelText?: string
	onOkDisabled?: boolean
	onOk?: ButtonProps['onClick']
	onCancel?: ButtonProps['onClick']
	size?: 'normal' | 'big'
	closeOnCancel?: boolean
	closeOnOk?: boolean
	customOnOk?: boolean
	customOnCancel?: boolean
	okLoading?: boolean
	footer?: boolean | FooterProps
	maxWidth?: DialogProps['maxWidth']
	dialogProps?: Partial<DialogProps>
	buttonProps?: ButtonProps
	okButtonProps?: LoadingButtonProps
	cancelButtonProps?: ButtonProps
	showCloseButton?: boolean
	onlyContent?: boolean
}

export const Modal = ({
	open,
	onClose,
	title,
	okText = 'Finalizar',
	cancelText = 'Cancelar',
	size = 'normal',
	onOk,
	onCancel,
	closeOnCancel = true,
	closeOnOk = true,
	body,
	footer = true,
	dialogProps,
	children,
	customOnCancel = false,
	customOnOk = false,
	showCloseButton = false,
	okLoading,
	buttonProps,
	maxWidth = 'sm',
	cancelButtonProps,
	okButtonProps,
	onOkDisabled,
	onlyContent = false
}: ModalProps) => (
	<Dialog
		open={open}
		onClose={onClose}
		maxWidth={maxWidth}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		PaperComponent={<S.Wrapper />}
		PaperProps={{ elevation: 7 }}
		scroll={onlyContent ? 'body' : 'paper'}
		{...dialogProps}
	>
		{!onlyContent && (
			<DialogTitle style={{ paddingTop: showCloseButton ? 24 : undefined }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					{size === 'big' ? (
						<Typography variant="h2" fontWeight={600}>
							{title}
						</Typography>
					) : (
						<Typography variant="h3" fontWeight={600}>
							{title}
						</Typography>
					)}
					{showCloseButton && (
						<IconButton size="small" onClick={onClose}>
							<CloseIcon />
						</IconButton>
					)}
				</Box>
			</DialogTitle>
		)}
		{(children && (
			<S.ModalContent showCloseButton={showCloseButton} className="custom-scrollbar">
				{children}
			</S.ModalContent>
		)) ||
			(body && (
				<DialogContent>
					<DialogContentText variant="body1" color="textPrimary">
						{body}
					</DialogContentText>
				</DialogContent>
			))}
		<DialogActions>
			{footer && !onlyContent && (
				<>
					{(typeof footer === 'boolean' || (footer as FooterProps).cancelButton) && (
						<Button
							fullWidth
							onClick={
								onCancel
									? customOnCancel
										? onCancel
										: e => {
												onCancel(e)
												if (closeOnCancel) onClose()
										  }
									: onClose
							}
							disabled={okLoading}
							variant="contained"
							color="secondary"
							{...buttonProps}
							{...cancelButtonProps}
							style={{
								minWidth: 100,
								width: 'fit-content',
								...buttonProps?.style,
								...cancelButtonProps?.style
							}}
						>
							{cancelText}
						</Button>
					)}
					{(typeof footer === 'boolean' || (footer as FooterProps).finishButton) && (
						<LoadingButton
							disabled={onOkDisabled}
							onClick={
								onOk
									? customOnOk
										? onOk
										: e => {
												onOk(e)
												if (closeOnOk) onClose()
										  }
									: onClose
							}
							loading={okLoading}
							fullWidth
							variant="contained"
							{...buttonProps}
							{...okButtonProps}
							style={{
								minWidth: 100,
								width: 'fit-content',
								...buttonProps?.style,
								...okButtonProps?.style
							}}
						>
							{okText}
						</LoadingButton>
					)}
				</>
			)}
		</DialogActions>
	</Dialog>
)

export default Modal

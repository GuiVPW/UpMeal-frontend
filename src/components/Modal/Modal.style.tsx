import css from '@emotion/css'
import { Paper, DialogContent } from '@mui/material'
import { styled } from '@mui/system'

// eslint-disable-next-line import/no-cycle
import { ModalProps } from './Modal'

export const Wrapper = styled(Paper)`
	@media only screen and (max-width: 600px) {
		.MuiDialogTitle-root,
		.MuiDialogContent-root,
		.MuiDialogActions-root {
			padding-left: 24px;
			padding-right: 24px;
		}

		.MuiDialogContent-root,
		.MuiDialogActions-root {
			padding-bottom: 24px;
		}
	}
`

type ModalContentProps = Pick<ModalProps, 'onlyContent' | 'size' | 'showCloseButton'>

export const ModalContent = styled(DialogContent)<ModalContentProps>(props => ({
	padding: '8px 24px',
	...css`
		padding-bottom: ${props.showCloseButton && 32};

		${props.onlyContent
			? css`
					@media only screen and (max-width: 960px) {
						padding: 24px;
					}
			  `
			: props.size === 'big' && {
					paddingTop: '20px'
			  }}
	`
}))

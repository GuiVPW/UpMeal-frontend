import React, { useState } from 'react'

import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
	Autocomplete,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	InputAdornment,
	Radio,
	RadioGroup,
	TextField
} from '@mui/material'

import foodOptions from '../../data/foods.json'
import { Food } from '../../services/entities'
import { MakeKeyOptional } from '../../types/string'
import Modal from '../Modal'

export interface FoodModalProps {
	open: boolean
	loading?: boolean
	data?: Food
	handleClose: () => void
	handleOk: (data: MakeKeyOptional<Food, 'id' | 'shopId'>) => void
}

type ModalForm = Partial<Food> | undefined

export const FoodModal = ({
	data,
	open,
	loading,
	handleClose,
	handleOk
}: FoodModalProps) => {
	const [form, setForm] = useState<ModalForm>(data)

	function handleChangeQuantity(quantity: number) {
		setForm({ ...form, quantity })
	}

	function handleChangeName(name: string) {
		setForm({ ...form, name })
	}

	function handleChangeAvailability(isAvailable: string) {
		setForm({ ...form, isAvailable: JSON.parse(isAvailable) as boolean })
	}

	function handleChangeValidate(date: Date) {
		setForm({ ...form, validationDate: date })
	}

	return (
		<Modal
			maxWidth="sm"
			onClose={() => handleClose()}
			open={open}
			okLoading={loading}
			onOkDisabled={loading || !form?.name || !form?.quantity || !form?.validationDate}
			onOk={() => handleOk(form as Food)}
			dialogProps={{ fullWidth: true }}
			showCloseButton
			title={data ? 'Alterar alimento' : 'Adicionar alimento'}
		>
			<Grid container sx={{ marginTop: '20px' }}>
				<Grid container item justifyContent="center" spacing={2}>
					<Grid item xs={12} md>
						<Autocomplete
							options={foodOptions}
							freeSolo
							autoHighlight
							value={data?.name}
							fullWidth
							onChange={(_, newValue) => handleChangeName(newValue ?? '')}
							renderInput={params => (
								<TextField required variant="outlined" {...params} label="Nome" />
							)}
						/>
					</Grid>
					<Grid item xs={12} md>
						<FormControl required component="fieldset">
							<FormLabel component="legend">Disponibilidade</FormLabel>
							<RadioGroup
								row
								value={data?.isAvailable}
								onChange={e => handleChangeAvailability(e.target.value)}
							>
								<FormControlLabel value={false} control={<Radio />} label="Sim" />
								<FormControlLabel value={true} control={<Radio />} label="Não" />
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
				<Grid container justifyContent="center" spacing={2} sx={{ marginTop: '12px' }}>
					<Grid item xs={12} md>
						<TextField
							label="Quantidade*"
							variant="outlined"
							required
							fullWidth
							onChange={e => handleChangeQuantity(parseFloat(e.target.value))}
							value={data?.quantity}
							type="number"
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							step=".01"
							onInput={(e: any) => {
								e.target.value = parseFloat(e.target.value.toString().slice(0, 4))
							}}
							InputProps={{
								inputProps: {
									min: 0,
									max: 100
								},
								endAdornment: (
									<InputAdornment position="end">
										<strong>kg</strong>
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid item xs={12} md>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label="Data de validade"
								value={data?.validationDate}
								minDate={new Date()}
								onChange={newValue => {
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore
									handleChangeValidate(newValue ?? '')
								}}
								renderInput={params => <TextField required {...params} />}
							/>
						</LocalizationProvider>
					</Grid>
				</Grid>
			</Grid>
		</Modal>
	)
}

export default FoodModal

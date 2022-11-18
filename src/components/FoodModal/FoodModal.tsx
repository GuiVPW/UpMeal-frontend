import React, { useEffect, useState } from 'react'

import { DatePicker } from '@mui/lab'
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
	// eslint-disable-next-line no-unused-vars
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

	useEffect(() => {
		if (data != null) {
			setForm({ ...data, isAvailable: Boolean(data.isAvailable) })
		}

		return () => {
			setForm({})
		}
	}, [data])

	function handleChangeQuantity(quantity: number) {
		setForm({ ...form, quantity })
	}

	function handleChangeName(name: string) {
		setForm({ ...form, name })
	}

	function handleChangeAvailability(isAvailable: string) {
		setForm({ ...form, isAvailable: isAvailable === 'true' })
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
			onOk={() => {
				handleOk(form as Food)
				setForm({})
			}}
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
							value={form?.name ?? data?.name}
							fullWidth
							onChange={(_, newValue) => handleChangeName(newValue ?? '')}
							renderInput={params => (
								<TextField required variant="outlined" {...params} label="Nome" />
							)}
						/>
					</Grid>
					{data && (
						<Grid item xs={12} md>
							<FormControl disabled={!data} required component="fieldset">
								<FormLabel component="legend">Disponibilidade</FormLabel>
								<RadioGroup
									row
									value={Boolean(form?.isAvailable) ?? Boolean(data?.isAvailable)}
									onChange={e => handleChangeAvailability(e.target.value)}
								>
									<FormControlLabel value={true} control={<Radio />} label="Sim" />
									<FormControlLabel value={false} control={<Radio />} label="Não" />
								</RadioGroup>
							</FormControl>
						</Grid>
					)}
				</Grid>
				<Grid container justifyContent="center" spacing={2} sx={{ marginTop: '12px' }}>
					<Grid item xs={12} md>
						<TextField
							label="Quantidade"
							variant="outlined"
							required
							fullWidth
							onChange={e => handleChangeQuantity(parseFloat(e.target.value))}
							value={form?.quantity ?? data?.quantity}
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
						<DatePicker
							label="Data de validade"
							value={form?.validationDate ?? data?.validationDate}
							minDate={new Date()}
							onChange={newValue => {
								handleChangeValidate(newValue ?? new Date())
							}}
							renderInput={params => <TextField required {...params} />}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Modal>
	)
}

export default FoodModal

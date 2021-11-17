/* eslint-disable indent */
import { ChangeEvent, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'

import {
	Add as PlusIcon,
	Close as CloseIcon,
	Check as CheckIcon
} from '@mui/icons-material'
import {
	Autocomplete,
	Button,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	InputAdornment,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography
} from '@mui/material'

import imageExample from '../assets/home-people.png'
import Link from '../components/Link'
import Snackbar, { AlertState } from '../components/Snackbar'
import foodOptions from '../data/foods.json'
import { Food, Shop } from '../services/entities'
import {
	FoodContainer,
	ImageContainer,
	MapContainer,
	MapFooter,
	Surface
} from '../styles/Logged'
import { MakeKeyOptional } from '../types/string'

const StaticMap = dynamic(() => import('../components/StaticMap'), { ssr: false })
export const Logged = () => {
	const [alert, setAlert] = useState<AlertState>({ open: false, message: '' })
	const mockedShop: Omit<Shop, 'password'> = {
		id: 1,
		city: 'Guarulhos',
		state: 'São Paulo',
		email: 'douglas@gmail.com',
		name: 'Mercado Douglas',
		latitude: -22.3415495,
		longitude: -49.0528041,
		phone: '11988900772',
		imageUrl: imageExample as unknown as string,
		foods: [
			{
				id: 1,
				shopId: 1,
				name: 'Banana',
				quantity: 5.3,
				availability: true
			},
			{
				id: 2,
				shopId: 1,
				name: 'Maçã',
				quantity: 1,
				availability: true
			},
			{
				id: 3,
				shopId: 1,
				name: 'Pêra',
				quantity: 2,
				availability: false
			}
		],
		reservations: []
	}

	const [foods, setFoods] = useState<MakeKeyOptional<Food, 'quantity'>[]>(
		mockedShop.foods ?? []
	)

	const removeFood = (foodId: number) => {
		const filteredFoods = foods.filter(({ id }) => id !== foodId)

		setFoods(filteredFoods)
		setAlert({ open: true, message: 'Alimento removido' })
	}

	const addFood = () => {
		setFoods(prev => [
			...prev,
			{
				id: prev[prev.length - 1].id + 1,
				name: '',
				availability: true,
				shopId: mockedShop.id
			}
		])
	}

	const updateFood = (foodId: number) => {
		const updatedFood = mockedShop.foods.find(({ id }) => id === foodId)
		const foodData = foods.find(({ id }) => id === foodId)
		console.log(updatedFood)

		if (!updatedFood) {
			// TODO: add api call to create food with given data
			return setAlert({ open: true, message: 'Alimento adicionado' })
		}

		// TODO: add api call to update food with given id and data
		return setAlert({ open: true, message: 'Alimento atualizado' })
	}

	const handleChangeField =
		(id: number, key: keyof Omit<Food, 'shopId' | 'id'>) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			const prev = foods.map(curr => {
				if (curr.id !== id) {
					return curr
				}
				const value = e.target.value
				const keyType = typeof curr[key]

				return {
					...curr,
					[key]: ['string', 'boolean', 'object'].includes(keyType)
						? value
						: Number.isNaN(parseFloat(value))
						? undefined
						: parseFloat(value)
				}
			})

			setFoods(prev)
		}

	const handleChangeAutocomplete = ({
		id,
		key,
		value
	}: {
		id: number
		key: keyof Omit<Food, 'shopId' | 'id'>
		value: string
	}) => {
		const prev = foods.map(curr => {
			if (curr.id !== id) {
				return curr
			}

			return {
				...curr,
				[key]: value
			}
		})

		setFoods(prev)
	}

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<Container maxWidth="md">
				<Surface elevation={6}>
					<Stack spacing={4}>
						<Stack alignItems="center">
							<ImageContainer>
								<Image src={mockedShop.imageUrl} alt="shop-image" />
							</ImageContainer>
						</Stack>

						<Divider flexItem variant="fullWidth" />

						<Stack spacing={2}>
							<Typography variant="display2">{mockedShop.name}</Typography>

							<Typography variant="h4" color="GrayText">
								<b>Email</b>: {mockedShop.email}
							</Typography>
							<Typography variant="h4" color="GrayText">
								<b>Telefone</b>: {mockedShop.phone}
							</Typography>
							<Stack direction="row" spacing={5}>
								<Typography variant="h4" color="GrayText">
									<b>Cidade</b>: {mockedShop.city}
								</Typography>
								<Typography variant="h4" color="GrayText">
									<b>Estado</b>: {mockedShop.state}
								</Typography>
							</Stack>
						</Stack>

						<Divider flexItem variant="fullWidth" />

						<Typography variant="display2">Localização</Typography>
						<MapContainer>
							<StaticMap location={mockedShop} />
							<MapFooter>
								<Link
									passHref
									target="_blank"
									rel="noopener noreferrer"
									href={`https://www.google.com/maps/dir/?api=1&destination=${mockedShop.latitude},${mockedShop.longitude}`}
								>
									Ver rotas no Google Maps
								</Link>
							</MapFooter>
						</MapContainer>

						{mockedShop.reservations.length > 0 && (
							<>
								<Divider flexItem variant="fullWidth" />

								<Typography variant="display2">Reservas</Typography>
							</>
						)}

						{foods.length > 0 && (
							<>
								<Divider flexItem variant="fullWidth" />

								<Typography variant="display2">Alimentos</Typography>
								<form>
									<FoodContainer alignItems="center" spacing={1}>
										{foods.map(food => (
											<Grid
												container
												key={food.id}
												alignItems="center"
												justifyContent="space-between"
												spacing={1}
											>
												<Grid item xs={5}>
													<Autocomplete
														options={foodOptions}
														freeSolo
														autoHighlight
														value={food.name}
														fullWidth
														onChange={(_, newValue) =>
															handleChangeAutocomplete({
																id: food.id,
																key: 'name',
																value: newValue ?? ''
															})
														}
														renderInput={params => (
															<TextField
																required
																variant="outlined"
																{...params}
																helperText="Nome*"
															/>
														)}
													/>
												</Grid>
												<Grid item xs={2}>
													<TextField
														helperText="Quantidade*"
														variant="outlined"
														required
														onChange={handleChangeField(food.id, 'quantity')}
														value={food.quantity}
														type="number"
														// eslint-disable-next-line @typescript-eslint/ban-ts-comment
														// @ts-ignore
														step=".01"
														onInput={(e: any) => {
															e.target.value = parseFloat(
																e.target.value.toString().slice(0, 4)
															)
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
												<Grid item sx={{ marginBottom: '16px' }}>
													<FormControl required component="fieldset">
														<FormLabel component="legend">Disponível</FormLabel>
														<RadioGroup
															row
															value={food.availability}
															onChange={handleChangeField(food.id, 'availability')}
														>
															<FormControlLabel
																value={false}
																control={<Radio />}
																label="Sim"
															/>
															<FormControlLabel
																value={true}
																control={<Radio />}
																label="Não"
															/>
														</RadioGroup>
													</FormControl>
												</Grid>
												<Grid item>
													<IconButton
														color="success"
														disabled={
															food.name === '' ||
															food.quantity === 0 ||
															food.availability === undefined
														}
														onClick={() => updateFood(food.id)}
													>
														<CheckIcon />
													</IconButton>
												</Grid>
												<Grid item>
													<IconButton color="error" onClick={() => removeFood(food.id)}>
														<CloseIcon />
													</IconButton>
												</Grid>
											</Grid>
										))}
										<Button
											sx={{ borderRadius: '24px', paddingY: '8px', paddingX: '40px' }}
											variant="outlined"
											onClick={() => addFood()}
											startIcon={<PlusIcon />}
											disabled={foods[foods.length - 1].name === ''}
										>
											Adicionar Alimento
										</Button>
									</FoodContainer>
								</form>
							</>
						)}
					</Stack>
				</Surface>
			</Container>
			<Snackbar open={alert.open} handleClose={() => setAlert({ ...alert, open: false })}>
				{alert.message}
			</Snackbar>
		</>
	)
}

export default Logged

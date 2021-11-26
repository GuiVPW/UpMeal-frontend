/* eslint-disable indent */
import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'

import { Add as PlusIcon } from '@mui/icons-material'
import { Button, Divider, Stack, Typography, CircularProgress } from '@mui/material'
import { format } from 'date-fns'

import FoodModal from '../components/FoodModal'
import FoodsTable from '../components/FoodsTable'
import Link from '../components/Link'
import Snackbar, { AlertState } from '../components/Snackbar'
import { useStoreon } from '../hooks/useStoreon'
import withAuth from '../hooks/withAuthHOC'
import { api } from '../services/api'
import { Food } from '../services/entities'
import { StyledContainer } from '../styles/Home'
import { ImageContainer, MapContainer, MapFooter, Surface } from '../styles/Logged'
import { MakeKeyOptional } from '../types/string'

const StaticMap = dynamic(() => import('../components/StaticMap'), { ssr: false })
export const Logged = () => {
	const { shop, loadingShop } = useStoreon('shop', 'loadingShop')
	const [alertError, setAlertError] = useState<AlertState>({ open: false, message: '' })
	const [alert, setAlert] = useState<AlertState>({ open: false, message: '' })
	const [loading, setLoading] = useState(false)
	const [updateVisible, setUpdateVisible] = useState(false)
	const [newVisible, setNewVisible] = useState(false)
	const [updatedFood, setUpdatedFood] = useState<Food>()
	const [foods, setFoods] = useState<Food[]>([])

	useEffect(() => {
		if (!loadingShop && shop?.foods) {
			setFoods(shop.foods)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingShop, shop])

	if (!shop) {
		return (
			<StyledContainer maxWidth="md">
				<Surface elevation={6}>
					<Stack alignItems="center" justifyContent="center">
						<CircularProgress />
					</Stack>
				</Surface>
			</StyledContainer>
		)
	}

	const removeFood = async (foodId: number) => {
		const filteredFoods = foods.filter(({ id }) => id !== foodId)

		setLoading(true)

		api
			.delete(`/shops/${shop.id}/foods/${foodId}`)
			.then(() => {
				setFoods(filteredFoods)
				setAlert({ open: true, message: 'Alimento removido.' })
			})
			.catch(() => {
				setAlertError({ open: true, message: 'Tenha certeza que a API está conectada.' })
			})
			.finally(() => setLoading(false))
	}

	const addFood = async (food: MakeKeyOptional<Food, 'shopId' | 'id'>) => {
		const { validationDate, ...fields } = food

		const { data } = await api.post(`/shops/${shop.id}/foods`, {
			...fields,
			shopId: shop.id,
			validationDate: format(validationDate as Date, 'yyyy-MM-dd')
		})

		setFoods(prev => [
			...prev,
			{ ...data.food, validationDate: new Date(data.food.validationDate) }
		])
		setUpdateVisible(false)

		return setAlert({ open: true, message: 'Alimento criado' })
	}

	const updateFood = async (food: MakeKeyOptional<Food, 'shopId' | 'id'>) => {
		const { validationDate, ...fields } = food

		console.log(validationDate)

		const response = await api.put(`/shops/${shop.id}/foods/${food.id}`, {
			...fields,
			isAvailable: !!fields.isAvailable,
			validationDate:
				typeof validationDate === 'string'
					? validationDate
					: format(validationDate, 'yyyy-MM-dd')
		})

		if (!response.data) {
			return setAlertError({
				open: true,
				message: 'Não foi possível atualizar o alimento.'
			})
		}

		const newData = Array.from(foods)
		const updatedIndex = newData.findIndex(({ id }) => id === food.id)
		newData[updatedIndex] = response.data.food

		setFoods(newData)
		return setAlert({ open: true, message: 'Alimento atualizado' })
	}

	const openUpdateModal = (id: number) => {
		const foundFood = foods.find(({ id: foodId }) => id === foodId)

		setUpdatedFood(foundFood)
		setUpdateVisible(true)
	}

	const openNewModal = () => {
		setNewVisible(true)
	}

	return (
		<>
			<Head>
				<title>Dados</title>
			</Head>

			<StyledContainer maxWidth="md">
				<Surface elevation={6}>
					<Stack spacing={4}>
						{shop.imageUrl && (
							<Stack alignItems="center">
								<ImageContainer>
									<Image src={shop.imageUrl as any} alt="shop-image" />
								</ImageContainer>
							</Stack>
						)}

						<Divider flexItem variant="fullWidth" />

						<Stack spacing={2}>
							<Typography variant="display2">{shop.name}</Typography>

							<Typography variant="h4" color="GrayText">
								<b>Email</b>: {shop.email}
							</Typography>
							<Typography variant="h4" color="GrayText">
								<b>Telefone</b>: {shop.phone}
							</Typography>
							<Stack direction="row" spacing={5}>
								<Typography variant="h4" color="GrayText">
									<b>Cidade</b>: {shop.city}
								</Typography>
								<Typography variant="h4" color="GrayText">
									<b>Estado</b>: {shop.state}
								</Typography>
							</Stack>
						</Stack>

						<Divider flexItem variant="fullWidth" />

						<Typography variant="display2">Localização</Typography>
						<MapContainer>
							<StaticMap location={shop} />
							<MapFooter>
								<Link
									passHref
									target="_blank"
									rel="noopener noreferrer"
									href={`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`}
								>
									Ver rotas no Google Maps
								</Link>
							</MapFooter>
						</MapContainer>

						<Divider flexItem variant="fullWidth" />

						<Typography variant="display2">Alimentos</Typography>
						<form>
							<FoodsTable
								foods={foods}
								onDeleteRow={removeFood}
								onOpenUpdate={openUpdateModal}
								loading={loading}
							/>
							<Button
								sx={{
									borderRadius: '24px',
									paddingY: '8px',
									paddingX: '40px',
									marginTop: '16px'
								}}
								variant="outlined"
								fullWidth
								onClick={() => openNewModal()}
								startIcon={<PlusIcon />}
								disabled={loading}
							>
								Adicionar Alimento
							</Button>
						</form>
					</Stack>
				</Surface>
			</StyledContainer>
			<FoodModal
				data={updatedFood}
				open={updateVisible}
				handleClose={() => setUpdateVisible(false)}
				loading={loading}
				handleOk={updateFood}
			/>
			<FoodModal
				open={newVisible}
				handleClose={() => setNewVisible(false)}
				loading={loading}
				handleOk={addFood}
			/>
			<Snackbar open={alert.open} handleClose={() => setAlert({ ...alert, open: false })}>
				{alert.message}
			</Snackbar>
			<Snackbar
				type="error"
				open={alertError.open}
				handleClose={() => setAlertError({ ...alertError, open: false })}
			>
				{alertError.message}
			</Snackbar>
		</>
	)
}

export default withAuth(Logged)

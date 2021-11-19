import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import router from 'next/router'

import LoadingButton from '@mui/lab/LoadingButton'
import { Grid, Stack, TextField, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'

import Link from '../components/Link'
import Snackbar, { AlertState } from '../components/Snackbar'
import { useStoreon } from '../hooks/useStoreon'
import { api } from '../services/api'
import { Shop } from '../services/entities'
import {
	ChosenImage,
	Content,
	Form,
	ImageSelector,
	PhotoContainer,
	Surface
} from '../styles/Signup'
import { OmitProperty } from '../types/string'

type SignupForm = Partial<OmitProperty<Shop, 'id' | 'reservations' | 'imageUrl'>> & {
	image?: File
	latitude: number
	longitude: number
}

export const SignUp = () => {
	const DynamicMap = dynamic(() => import('../components/Map'), { ssr: false })
	const { dispatch } = useStoreon()
	const [alertError, setAlertError] = useState<AlertState>({
		open: false,
		message: 'Os dados inseridos estão incorretos ou inválidos. Tente novamente.'
	})

	const [initialPosition, setInitialPosition] = useState<
		Pick<SignupForm, 'latitude' | 'longitude'>
	>({
		latitude: -22.3415495,
		longitude: -49.0528041
	})
	const [signup, setSignup] = useState<SignupForm>(initialPosition)
	const [loading, setLoading] = useState(false)
	const [avatar, setAvatar] = useState<string>()
	const [, setAvatarFile] = useState<File>()

	const disabledCondition =
		!signup ||
		!(
			signup.email &&
			signup.password &&
			signup.name &&
			signup.phone &&
			signup.state &&
			signup.city
		)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			const { latitude, longitude } = coords
			setInitialPosition({
				latitude,
				longitude
			})
			setSignup({
				latitude,
				longitude
			})
		})
	}, [])

	const handleChange =
		(key: keyof Omit<SignupForm, 'image'>) => (e: ChangeEvent<HTMLInputElement>) => {
			setSignup({ ...signup, [key]: e.target.value })
		}

	const onDrop = useCallback(([file], [error]) => {
		if (file) {
			setAvatar(URL.createObjectURL(file))
			setAvatarFile(file)
		}

		error?.errors.forEach(({ code }: { code: any }) => {
			if (code === 'file-invalid-type') {
				return alert('File format not valid')
			}

			if (code === 'file-too-large') {
				return alert('File too large')
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: ['image/jpeg', 'image/png'],
		// 2mb
		maxSize: 2000000,
		multiple: false,
		preventDropOnDocument: false
	})

	const handleMarkerChange = ({ lat, lng }: { lat: number; lng: number }) => {
		setSignup({
			...signup,
			latitude: lat,
			longitude: lng
		})
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setLoading(true)

		const response = await api.post<Shop>('/shops', signup)

		if (response.data) {
			const token = Buffer.from(`${signup.email}:${signup.password}`).toString('base64')
			dispatch('shop/set', { shop: response.data, loadingShop: false, token })

			router.push('/home')
			setLoading(false)
		} else {
			setLoading(false)
			setAlertError({ ...alertError, open: true })
		}
	}

	return (
		<>
			<Head>
				<title>Cadastro</title>
			</Head>

			<Surface elevation={6}>
				<Content>
					<Stack spacing={2}>
						<Typography variant="display2">Faça seu Cadastro</Typography>
						<Typography variant="h4" color="textSecondary">
							Faça seu cadastro, entre na plataforma e ajude pessoas a evitarem o
							desperdício.
						</Typography>
						<Link href="/">Já tenho um cadastro</Link>
					</Stack>
				</Content>

				<Form onSubmit={handleSubmit}>
					<Stack spacing={3}>
						<PhotoContainer>
							{avatar ? (
								<>
									<ImageSelector>
										{/* eslint-disable-next-line react/jsx-no-undef */}
										<ChosenImage {...getRootProps()} src={avatar} alt="user-image-upload" />
										<input {...getInputProps()} type="file" accept="image/*" />
									</ImageSelector>
								</>
							) : (
								<ImageSelector {...getRootProps()}>
									<input {...getInputProps()} type="file" accept="image/*" />
									<p>Arraste e solte uma imagem!</p>
								</ImageSelector>
							)}
						</PhotoContainer>

						<TextField
							placeholder="Seu E-mail"
							value={signup?.email}
							onChange={handleChange('email')}
							fullWidth
							type="email"
						/>
						<TextField
							placeholder="Seu Nome"
							value={signup?.name}
							onChange={handleChange('name')}
							fullWidth
						/>
						<TextField
							type="password"
							placeholder="Sua Senha"
							value={signup?.password}
							onChange={handleChange('password')}
							fullWidth
						/>
						<TextField
							type="tel"
							placeholder="Seu Telefone"
							value={signup?.phone}
							onChange={handleChange('phone')}
							fullWidth
						/>
						<Grid container justifyContent="space-between">
							<Grid item xs={9}>
								<TextField
									placeholder="Sua Cidade"
									value={signup?.city}
									onChange={handleChange('city')}
									fullWidth
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									placeholder="UF"
									value={signup?.state}
									onChange={handleChange('state')}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Stack justifyContent="center" spacing={3}>
							<Typography variant="h1">
								Escolha no mapa a localização do seu estabelecimento.
							</Typography>
							<div>
								<DynamicMap
									initialPosition={initialPosition}
									location={{ latitude: signup.latitude, longitude: signup.longitude }}
									handleChangePosition={handleMarkerChange}
								/>
							</div>
						</Stack>
					</Stack>
					<LoadingButton
						disabled={disabledCondition}
						loading={loading}
						fullWidth
						type="submit"
						variant="contained"
						sx={{ marginTop: '48px' }}
					>
						Cadastrar
					</LoadingButton>
				</Form>
				<Snackbar
					type="error"
					open={alertError.open}
					handleClose={() => setAlertError({ ...alertError, open: false })}
				>
					{alertError.message}
				</Snackbar>
			</Surface>
		</>
	)
}

export default SignUp

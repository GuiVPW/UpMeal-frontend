import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import type { NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'

import LoadingButton from '@mui/lab/LoadingButton'
import { Stack, TextField, Typography, useMediaQuery, Theme } from '@mui/material'

import homeImage from '../assets/home-people.png'
import Link from '../components/Link'
import Snackbar, { AlertState } from '../components/Snackbar'
import { useStoreon } from '../hooks/useStoreon'
import { api } from '../services/api'
import { Shop } from '../services/entities'
import { FormSection, StyledForm } from '../styles/Home'

interface LoginForm {
	email?: string
	password?: string
}

const Home: NextPage = () => {
	const { dispatch } = useStoreon()
	const [alertError, setAlertError] = useState<AlertState>({
		open: false,
		message: 'Os dados inseridos estão incorretos ou inválidos. Tente novamente.'
	})
	const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
	const [login, setLogin] = useState<LoginForm>({ email: '', password: '' })
	const [loading, setLoading] = useState(false)
	const disabledCondition =
		!login || !(login.email && login.password && login.password.length >= 6)

	const handleChange = (key: keyof LoginForm) => (e: ChangeEvent<HTMLInputElement>) => {
		setLogin({ ...login, [key]: e.target.value })
	}

	useEffect(() => {
		router.prefetch('/home')
	}, [])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		api
			.post<Shop>('/shops/authenticate', {
				username: login.email,
				password: login.password
			})
			.then(({ data }) => {
				setLoading(false)
				const token = Buffer.from(`${login.email}:${login.password}`).toString('base64')

				dispatch('shop/set', { shop: data, loadingShop: false, token })

				router.push('/home')
			})
			.catch(() => {
				setLoading(false)
				setAlertError({ ...alertError, open: true })
			})
	}

	return (
		<>
			<Head>
				<title>UpMeal</title>
			</Head>

			<FormSection>
				<StyledForm onSubmit={handleSubmit}>
					<Typography variant="display2">Faça seu Login</Typography>

					<Stack spacing={2} sx={{ marginY: '24px' }}>
						<Stack spacing={1}>
							<TextField
								placeholder="Seu E-mail"
								value={login?.email}
								onChange={handleChange('email')}
								type="email"
							/>
							<TextField
								type="password"
								placeholder="Sua Senha"
								value={login?.password}
								onChange={handleChange('password')}
							/>
						</Stack>
						<LoadingButton
							disabled={disabledCondition}
							loading={loading}
							fullWidth
							type="submit"
							variant="contained"
						>
							Entrar
						</LoadingButton>
					</Stack>

					<Link href="signup">Não tenho cadastro</Link>
				</StyledForm>
			</FormSection>
			{mdUp && <Image src={homeImage} alt="people-hugging" />}
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

export default Home

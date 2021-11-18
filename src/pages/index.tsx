import { ChangeEvent, FormEvent, useState } from 'react'

import type { NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'

import LoadingButton from '@mui/lab/LoadingButton'
import { Stack, TextField, Typography, useMediaQuery, Theme } from '@mui/material'

import homeImage from '../assets/home-people.png'
import Link from '../components/Link'
import { FormSection, StyledForm } from '../styles/Home'

interface LoginForm {
	email?: string
	password?: string
}

const Home: NextPage = () => {
	const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
	const [login, setLogin] = useState<LoginForm>()
	const [loading, setLoading] = useState(false)
	const disabledCondition =
		!login || !(login.email && login.password && login.password.length >= 6)

	const handleChange = (key: keyof LoginForm) => (e: ChangeEvent<HTMLInputElement>) => {
		setLogin({ ...login, [key]: e.target.value })
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setTimeout(() => {
			setLoading(false)

			setTimeout(() => router.push('/home'), 500)
		}, 3000)
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
		</>
	)
}

export default Home

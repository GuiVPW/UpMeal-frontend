import { ChangeEvent, FormEvent, useState } from 'react'

import type { NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'

import { Button, Stack, TextField, Typography, useMediaQuery, Theme } from '@mui/material'

import homeImage from '../assets/home-people.png'
import { Container } from '../components/Container'
import Link from '../components/Link'
import { FormSection, StyledForm } from '../styles/Home'

interface LoginForm {
	email?: string
	password?: string
}

const Home: NextPage = () => {
	const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
	const [login, setLogin] = useState<LoginForm>()

	const handleChange = (key: keyof LoginForm) => (e: ChangeEvent<HTMLInputElement>) => {
		setLogin({ ...login, [key]: e.target.value })
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(login)
	}

	return (
		<>
			<Head>
				<title>UpMeal</title>
				<meta
					name="description"
					content="Evite o desperdício através de uma plataforma de busca de alimentos prestes a vencer"
				/>
				<link rel="icon" href="/favicon.ico" />
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
							/>
							<TextField
								type="password"
								placeholder="Sua Senha"
								value={login?.password}
								onChange={handleChange('password')}
							/>
						</Stack>
						<Button fullWidth type="submit" variant="contained">
							Entrar
						</Button>
					</Stack>

					<Link href="signup">Não tenho cadastro</Link>
				</StyledForm>
			</FormSection>
			{mdUp && <Image src={homeImage} alt="people-hugging" />}
		</>
	)
}

export default Home

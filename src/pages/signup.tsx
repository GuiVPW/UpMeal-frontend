import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

import Head from 'next/head'

import LoadingButton from '@mui/lab/LoadingButton'
import { Grid, Stack, TextField, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'

import Link from '../components/Link'
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
}

export const SignUp = () => {
	const [signup, setLogin] = useState<SignupForm>()
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

	const handleChange =
		(key: keyof Omit<SignupForm, 'image'>) => (e: ChangeEvent<HTMLInputElement>) => {
			setLogin({ ...signup, [key]: e.target.value })
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

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(signup)
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 3000)
	}

	return (
		<>
			<Head>
				<title>Cadastro</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Surface elevation={6}>
				<Content>
					<Stack spacing={2}>
						<Typography variant="display2">Faça seu Cadastro</Typography>
						<Typography variant="body1" color="textSecondary">
							Faça seu cadastro, entre na plataforma e ajude pessoas a evitarem o
							desperdício.
						</Typography>
						<Link href="/">Já sou cadastrado</Link>
					</Stack>
				</Content>

				<Form onSubmit={handleSubmit}>
					<Stack spacing={2} sx={{ marginY: '24px' }}>
						<Stack spacing={1}>
							<PhotoContainer>
								{avatar ? (
									<>
										<ImageSelector>
											{/* eslint-disable-next-line react/jsx-no-undef */}
											<ChosenImage
												{...getRootProps()}
												src={avatar}
												alt="user-image-upload"
											/>
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
						</Stack>
						<LoadingButton
							disabled={disabledCondition}
							loading={loading}
							fullWidth
							type="submit"
							variant="contained"
						>
							Cadastrar
						</LoadingButton>
					</Stack>
				</Form>
			</Surface>
		</>
	)
}

export default SignUp

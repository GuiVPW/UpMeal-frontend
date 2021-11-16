import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>UpMeal</title>
				<meta
					name="description"
					content="Evite o desperdício através de uma plataforma de busca de alimentos prestes a vencer"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>Hello World</h1>
			</main>
		</div>
	)
}

export default Home

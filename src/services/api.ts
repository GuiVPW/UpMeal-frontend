import { Axios } from 'axios'

import { Shop } from './entities'

export const api = new Axios({
	baseURL: process.env.API_URL || 'http://localhost:8080/api/rest',
	timeout: 5000,
	headers: {
		'Content-type': 'application/json'
	},
	validateStatus: status => status >= 200 && status < 400,
	transformRequest: [
		function transformRequest(data) {
			if (data && JSON.stringify(data)) {
				const formattedData = JSON.stringify(data)

				return formattedData
			}

			return data
		}
	],
	transformResponse: [
		function transformResponse(data) {
			return JSON.parse(data)
		}
	]
})

api.interceptors.request.use(config => {
	const { headers } = config

	const storeon = localStorage.getItem('storeon')

	if (storeon) {
		const { token } = JSON.parse(storeon) as { token: string; shop: Shop }

		const newHeaders = { ...headers, Authorization: `Basic ${token}` }

		config.headers = newHeaders
	}

	return config
})

import { Axios } from 'axios'

import { Shop } from './entities'

export const api = new Axios({
	baseURL: process.env.API_URL || 'http://localhost:8080',
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
			try {
				return JSON.parse(data)
			} catch {
				return data
			}
		}
	]
})

api.interceptors.request.use(config => {
	const { headers } = config

	const storeon = localStorage.getItem('storeon')

	if (storeon) {
		const { token } = JSON.parse(storeon) as { token: string; shop: Shop }

		if (!token) {
			return config
		}

		const newHeaders = { ...headers, Authorization: token }

		config.headers = newHeaders
	}

	return config
})

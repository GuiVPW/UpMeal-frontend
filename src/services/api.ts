import { Axios } from 'axios'

const { API_URL } = process.env

export const api = new Axios({
	baseURL: API_URL || '127.0.0.1:8080/api/rest',
	timeout: 5000
})

api.interceptors.request.use(config => {
	const { headers } = config

	const token = localStorage.getItem('token')

	if (token) {
		const newHeaders = { ...headers, Authorization: `Basic ${token}` }

		config.headers = newHeaders
	}

	return config
})

import { IStoreonModule } from 'storeon'

import { api } from '../services/api'
import { Shop, Food } from '../services/entities'

export interface ShopState {
	token: string | null
	shop: Shop | null
	loadingShop: boolean
}

export interface ShopEvents {
	'shop/set': ShopState
	'shop/setToken': string
	'shop/removeToken': void
	'shop/getShop': void
	'shop/loading': boolean
	'shop/setShop': ShopState['shop']
	'food/setShopFoods': Food[]
	'shop/signOut': void
}

export const shopModule: IStoreonModule = store => {
	store.on('@init', () => ({
		token: null,
		loadingShop: false
	}))

	store.on('@changed', (_state, data) => {
		if (data?.token && !data?.shop) {
			store.dispatch('shop/getShop')
		}
	})

	store.on('shop/getShop', async state => {
		store.dispatch('shop/loading', true)

		if (!state.token && !state.shop) {
			store.dispatch('shop/loading', false)
			return
		}

		try {
			const response = await api.get(`/shops/me`)

			store.dispatch('shop/loading', false)
			store.dispatch('shop/setShop', response.data.me)
		} catch {
			store.dispatch('shop/loading', false)
			store.dispatch('shop/signOut')
		}
	})

	store.on('shop/signOut', () => {
		return {
			shop: null,
			token: null
		}
	})

	store.on('shop/setShop', (_state, data) => ({
		shop: data
	}))

	store.on('shop/set', (state, payload) => ({
		...state,
		...payload
	}))

	store.on('shop/loading', (_state, isLoading) => ({
		loadingShop: isLoading
	}))

	store.on('shop/setToken', (_state, token) => ({
		token
	}))

	store.on('shop/removeToken', () => ({
		token: null,
		shop: null
	}))
}

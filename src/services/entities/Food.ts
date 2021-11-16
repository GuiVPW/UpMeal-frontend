import { Shop } from './Shop'

export interface Food {
	name: string
	quantity: number
	availability: boolean
	shopId: number
	shop?: Shop
}

import { Food } from './Food'
import { Reservation } from './Reservation'

export interface Shop {
	id: number
	name: string
	email: string
	password: string
	phone: string
	city: string
	state: string
	imageUrl?: string
	latitude: number
	longitude: number
	reservations: Reservation[]
	foods: Food[]
}

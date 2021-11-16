import { Reservation } from './Reservation'

export interface Shop {
	id: number
	name: string
	email: string
	phone: string
	city: string
	state: string
	imageUrl?: string
	latitude: number
	longitude: number
	reservations?: Reservation[]
}

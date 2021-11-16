import { Reservation } from './Reservation'

export interface Client {
	id: number
	accessId: string
	name: string
	phone: string
	city: string
	state: string
	reservations?: Reservation[]
}

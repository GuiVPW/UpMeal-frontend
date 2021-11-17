import { Client } from './Client'

export interface Reservation {
	id: number
	clientId: number
	shopId: number
	client: Client
}

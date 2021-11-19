export interface Food {
	id: number
	name: string
	quantity: number
	isAvailable: boolean
	validationDate: Date | string
	shopId: number
}

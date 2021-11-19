import { persistState } from '@storeon/localstorage'
import { createStoreon } from 'storeon'
import { storeonDevtools } from 'storeon/devtools'

import { ShopEvents, ShopState, shopModule } from './shop'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState extends ShopState {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppEvents extends ShopEvents {}

declare module 'storeon' {
	export type IStoreonModule<State = AppState, Events = AppEvents> = (
		store: StoreonStore<State, Events>
	) => void
}
declare module 'storeon/react' {
	export function useStoreon(
		...keys: (keyof AppState)[]
	): useStoreon.StoreData<AppState, AppEvents>
}

export const store = createStoreon<AppState, AppEvents>(
	[
		shopModule,
		persistState<AppState>(['token', 'shop']),
		process.env.NODE_ENV !== 'production' && storeonDevtools
	].filter(Boolean)
)

import { useStoreon as useStateStoreon } from 'storeon/react'

import { AppState, AppEvents } from '../state/store'

export const useStoreon = (...keys: (keyof AppState)[]) =>
	useStateStoreon<AppState, AppEvents>(...keys)

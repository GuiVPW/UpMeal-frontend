export type OmitProperty<T, K extends keyof T = keyof T> = Omit<T, K>

export type MakeKeyOptional<T, K extends keyof T = keyof T> = Partial<Pick<T, K>> &
	Omit<T, K>

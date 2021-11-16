export type OmitProperty<T, K extends keyof T = keyof T> = Omit<T, K>

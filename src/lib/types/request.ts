export type $jwtPayload = {
	id: string
	iat: Date
	exp: Date
}

export interface IPaging {
	page: number
	limit: number
}

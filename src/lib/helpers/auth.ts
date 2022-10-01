import { AUTH } from '@constants'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const signJWT = (payload: JwtPayload): string => {
	return jwt.sign(payload, AUTH.secret)
}

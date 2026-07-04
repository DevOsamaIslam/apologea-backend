import { AUTH } from '@constants'
import { hash } from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const signJWT = (payload: JwtPayload): string => {
  return jwt.sign(payload, AUTH.secret)
}

export const generateToken = () => crypto.randomUUID()

export const hashed = async (data: any) => {
  return await hash(data, 10)
}

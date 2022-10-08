import { AUTH } from '@constants'
import User from 'api/users/model/User'
import { IUser } from 'api/users/types'
import { hash } from 'bcrypt'
import { HydratedDocument } from 'mongoose'
import { IUserAuth } from '../types'
import AuthSchema from './Schema'

// hash the password
AuthSchema.pre('save', async function (this: HydratedDocument<IUserAuth>, next) {
	this.reset = undefined
	this.password = await hash(this.password, AUTH.saltRounds)
	next()
})

export const createUser = (user: Partial<IUser>) => {
	return User.create(user)
}

export default User

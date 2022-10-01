import User from 'api/users/model/User'
import { AUTH } from '@constants'
import AuthSchema from './Schema'
import { hash } from 'bcrypt'
import { HydratedDocument } from 'mongoose'
import { IUserAuth } from '../types'

// hash the password
AuthSchema.pre(
	'save',
	async function (this: HydratedDocument<IUserAuth>, next) {
		this.reset = undefined
		this.password = await hash(this.password, AUTH.saltRounds)
		next()
	}
)

export const createUser = (auth: Partial<IUserAuth>) => {
	return User.create({ auth })
}

export default User

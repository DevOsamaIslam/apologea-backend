import User from '#/api/users/model/User'
import { AUTH } from '#lib/constants'
import AuthSchema, { IUserAuth } from './Schema'
import { hash } from 'bcrypt'
import { HydratedDocument } from 'mongoose'

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

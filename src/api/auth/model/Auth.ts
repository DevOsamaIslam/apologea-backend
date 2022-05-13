import User from '#/api/users/model/User'
import AuthSchema, { IUserAuth } from './Schema'
import { hash } from 'bcrypt'
import { auth } from '#/config/settings'

// hash the password
AuthSchema.pre('save', async function (this: IUserAuth, next) {
	this.password = await hash(this.password, auth.saltRounds)
	next()
})

export const createUser = (user: Partial<IUserAuth>) => {
	return User.create({ auth: user })
}

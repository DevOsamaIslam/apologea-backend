import { $role } from '@types'
import { IUser, IUserProfile } from 'api/users/types'

export interface IUserAuth {
	username: string
	email: string
	password: string
	role: $role
	reset?: {
		token: string
	}
}

export interface IUserRegistrationFormData extends IUserProfile, IUserAuth {}

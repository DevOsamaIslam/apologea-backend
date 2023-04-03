import { $roleLabel } from '@types'
import { IUser, IUserProfile } from 'api/users/model/types'

export interface IUserAuth {
	username?: string
	email: string
	password: string
	role: $roleLabel
	emailVerified?: boolean
	reset?: {
		token: string
	}
}

export interface IUserRegistrationPayload {
	name?: IUserProfile['name']
	phone?: IUserProfile['phone']
	affiliations?: IUserProfile['affiliations']
	bio?: IUserProfile['bio']
	qualifications?: IUserProfile['qualifications']
	confirmPassword?: string
	username?: IUserAuth['username']
	email: IUserAuth['email']
	password: IUserAuth['password']
	role: IUserAuth['role']
}

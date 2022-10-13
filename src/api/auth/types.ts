import { $roleLabel } from '@types'
import { IUser, IUserProfile } from 'api/users/model/types'

export interface IUserAuth {
	username: string
	email: string
	password: string
	role: $roleLabel
	emailVerified?: boolean
	reset?: {
		token: string
	}
}

export interface IUserRegistrationFormData
	extends Pick<IUserProfile, 'name' | 'phone' | 'affiliations' | 'bio' | 'qualifications'>,
		IUserAuth {
	confirmPassword: string
}

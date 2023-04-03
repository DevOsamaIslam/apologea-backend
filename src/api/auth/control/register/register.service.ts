import { asyncHandler } from '@helpers'
import { createUser } from 'api/auth/model/Auth'
import { IUserRegistrationPayload } from 'api/auth/types'
import { IUserDocument } from 'api/users/model/types'

type $registerService = (formData: IUserRegistrationPayload) => ReturnType<typeof asyncHandler<IUserDocument | null>>
export const registerService: $registerService = async formData => {
	const [user, error] = await asyncHandler<IUserDocument>(
		createUser({
			auth: {
				email: formData.email,
				password: formData.password,
				role: formData.role,
				username: formData.username,
			},
			profile: {
				...formData,
			},
		}),
	)

	return [user, error]
}

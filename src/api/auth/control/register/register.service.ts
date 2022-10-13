import { asyncHandler } from '@helpers'
import { createUser } from 'api/auth/model/Auth'
import { IUserRegistrationFormData } from 'api/auth/types'
import { IUserDocument } from 'api/users/model/types'

type $registerService = (formData: IUserRegistrationFormData) => ReturnType<typeof asyncHandler<IUserDocument | null>>
export const registerService: $registerService = async formData => {
	const [user, error] = await asyncHandler<IUserDocument>(
		createUser({
			auth: {
				...formData,
			},
			profile: {
				...formData,
			},
		}),
	)

	return [user, error]
}

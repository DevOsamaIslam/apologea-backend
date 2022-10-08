import { ERROR } from '@constants'
import { asyncHandler } from '@helpers'
import { createUser } from 'api/auth/model/Auth'
import { IUserRegistrationFormData } from 'api/auth/types'
import { IUserDocument } from 'api/users/types'

type $registerService = (formData: Partial<IUserRegistrationFormData>) => ReturnType<typeof asyncHandler<IUserDocument | null>>

export const registerService: $registerService = async formData => {
	if (formData.role === 'Publisher') return registerPublisher(formData)
	return registerReader(formData)
}

const registerReader = async (formData: Partial<IUserRegistrationFormData>): ReturnType<typeof asyncHandler<IUserDocument>> => {
	const [user, error] = await asyncHandler<IUserDocument>(
		createUser({
			auth: {
				password: formData.password!,
				username: formData.username!,
				email: formData.email!,
				role: formData.role!,
			},
			profile: {
				name: formData.name!,
				affiliations: formData.affiliations!,
				bio: formData.bio!,
				qualifications: formData.qualifications!,
			},
		}),
	)

	return [user, error]
}

const registerPublisher = async (
	formData: Partial<IUserRegistrationFormData>,
): ReturnType<typeof asyncHandler<IUserDocument | null>> => {
	// check required fields
	if (!formData.name || !formData.qualifications || !formData.bio || !formData.affiliations?.length)
		return [null, new Error(ERROR.missingFields)]

	const [user, error] = await asyncHandler<IUserDocument | null>(
		createUser({
			auth: {
				password: formData.password!,
				username: formData.username!,
				email: formData.email!,
				role: formData.role!,
			},
			profile: {
				name: formData.name!,
				affiliations: formData.affiliations!,
				bio: formData.bio!,
				qualifications: formData.qualifications!,
			},
		}),
	)

	return [user, error]
}

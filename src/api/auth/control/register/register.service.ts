import { asyncHandler } from '@helpers'
import { createUser } from 'api/auth/model/Auth'
import { IUserRegistrationFormData } from 'api/auth/types'
import { IUserDocument } from 'api/users/types'

type $registerService = (formData: IUserRegistrationFormData) => ReturnType<typeof asyncHandler<IUserDocument | null>>
/**
 * @param  {{password:formData.password} createUser({auth
 * @param  {formData.username} username
 * @param  {formData.email} email
 * @param  {formData.role} role
 * @param  {} }
 * @param  {{name:formData.name||formData.username} profile
 * @param  {formData.affiliations} affiliations
 * @param  {formData.bio} bio
 * @param  {formData.qualifications} qualifications
 * @param  {} }
 * @param  {} }
 * @param  {} return[user
 */
export const registerService: $registerService = async formData => {
	const [user, error] = await asyncHandler<IUserDocument>(
		createUser({
			auth: {
				password: formData.password,
				username: formData.username,
				email: formData.email,
				role: formData.role,
			},
			profile: {
				name: formData.name || formData.username,
				affiliations: formData.affiliations,
				bio: formData.bio,
				qualifications: formData.qualifications,
			},
		}),
	)

	return [user, error]
}

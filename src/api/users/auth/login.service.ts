import { asyncHandler } from 'async-handler-ts'
import { compare } from 'bcrypt'
import { UserModel } from '../model/Users.Model'
import { TLoginPayload } from '../users.schema'
import { TUserDocument } from '../model/Users.Model'

export async function loginUser(credentials: TLoginPayload): Promise<[TUserDocument | undefined, Error | undefined]> {
	const { email, password } = credentials

	const [user, error] = await asyncHandler(UserModel.findOne({ email }).exec())

	if (!user || error) {
		return [undefined, error]
	}

	const isPasswordMatch = await compare(password, user.password)
	if (!isPasswordMatch) {
		return [undefined, undefined]
	}

	return [user, undefined]
}

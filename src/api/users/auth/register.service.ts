import { asyncHandler } from 'async-handler-ts'
import { UserModel } from '../model/Users.Model'
import { TRegistrationPayload } from '../users.schema'

export async function registerUser(input: TRegistrationPayload) {
  return asyncHandler(UserModel.create(input))
}

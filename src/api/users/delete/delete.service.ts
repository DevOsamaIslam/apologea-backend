import { asyncHandler } from 'async-handler-ts'
import { UserModel } from '../model/User.Model'

export const deleteUserService = async (userId: string) => {
  return await asyncHandler(UserModel.findByIdAndDelete(userId).exec())
}

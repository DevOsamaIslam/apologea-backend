import { asyncHandler } from 'async-handler-ts'
import { UserModel } from '../model/User.Model'

export const getUsersService = async () => {
  return await asyncHandler(UserModel.find().select('-password -__v').exec())
}

export const getUserByNameService = async (username: string) => {
  return UserModel.findOne({ username }).select('-password -__v')
}

export const getUserByEmailService = async (email: string) => {
  return await asyncHandler(UserModel.findOne({ email }).exec())
}

import { asyncHandler } from 'async-handler-ts'
import { UserModel } from '../model/Users.Model'

export const getUsersService = async () => {
  return await asyncHandler(UserModel.find().exec())
}

export const getUserByNameService = async (username: string) => {
  return await asyncHandler(UserModel.findOne({ username }).select('-password -__v').exec())
}

export const getUserByEmailService = async (email: string) => {
  return await asyncHandler(UserModel.findOne({ email }).exec())
}

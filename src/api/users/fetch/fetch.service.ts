import { asyncHandler } from 'async-handler-ts'
import { UserModel } from '../model/User.Model'
import { Request } from 'express'
import z from 'zod'
import { PaginationSchema } from '@constants'
import { mapToMongooseFilter } from '@helpers'

export const getUsersService = async (req: Request) => {
  const { limit, page, sort, filters, populate } = req.body as z.infer<typeof PaginationSchema>
  const mappedFilters = mapToMongooseFilter(filters)

  return await UserModel.paginate(mappedFilters, {
    limit,
    page,
    sort,
    populate,
  })
}

export const getUserByNameService = async (username: string) => {
  return UserModel.findOne({ username }).select('-password -__v')
}

export const getUserByEmailService = async (email: string) => {
  return await asyncHandler(UserModel.findOne({ email }).exec())
}

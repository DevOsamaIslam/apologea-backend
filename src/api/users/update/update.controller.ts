import { RequestHandler } from 'express'
import { TUserDocument } from '../model/User.Model'
import { updateUserService } from './update.service'
import { StatusCodes } from 'http-status-codes'
import { ERROR, SUCCESS } from '@constants'
import { returnHandler, feedback } from '@helpers'

export const updateUserController: RequestHandler = async (req, res, next) => {
  const profile = req.body as Partial<TUserDocument>
  const username = req.params.username as string
  const [user, error] = await updateUserService({ username, profile })

  if (!user || error) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('error', ERROR.SWR)))

  return next(returnHandler(StatusCodes.OK, user, feedback('success', SUCCESS.updated)))
}

import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getUserByNameService, getUsersService } from './fetch.service'

export const getUsersController: RequestHandler = async (req, res, next) => {
  const [users, error] = await getUsersService()

  if (error || !users?.length) return next(returnHandler(StatusCodes.NOT_FOUND, users, feedback('error', ERROR.SWR)))

  return next(returnHandler(StatusCodes.OK, users, feedback('success', SUCCESS.found)))
}

export const getOneUserController: RequestHandler = async (req, res, next) => {
  const username = req.params.username as string
  const [user, error] = await getUserByNameService(username)

  if (!user || error) return next(returnHandler(StatusCodes.NOT_FOUND, user, feedback('error', ERROR.SWR)))

  return next(returnHandler(StatusCodes.OK, user, feedback('success', SUCCESS.found)))
}

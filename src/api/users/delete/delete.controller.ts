import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { deleteUserService } from './delete.service'
import { ERROR, SUCCESS } from '@constants'
import { returnHandler, feedback } from '@helpers'

export const deleteUserController: RequestHandler = async (req, _res, next) => {
	const [deleteResults, error] = await deleteUserService(req.params.userId)

	if (error || !deleteResults) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	return next(returnHandler(StatusCodes.OK, deleteResults, feedback('success', SUCCESS.deleted)))
}

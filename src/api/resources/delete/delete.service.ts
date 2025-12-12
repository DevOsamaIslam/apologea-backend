import { UserModel } from 'api/users/model/User.Model'
import { runTransaction } from 'lib/helpers/transactions'
import { ResourceModel } from '../model/Resource.Model'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'

export const deleteResourceService = async (params: { resourceId: string; userId: string }) => {
  const { resourceId, userId } = params

  return runTransaction(async () => {
    const resource = await ResourceModel.findById(resourceId)

    if (!resource) {
      throw new ServerError({
        message: 'Resource not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })
    }

    resource.deleteOne().exec()

    return true
  })
}

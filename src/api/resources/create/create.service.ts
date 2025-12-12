import { runTransaction } from 'lib/helpers/transactions'
import { ResourceModel } from '../model/Resource.Model'
import { TCreateResource } from '../resources.schema'

export const createResourceService = async (params: {
  userId: string
  resource: TCreateResource
}) => {
  const { userId, resource } = params

  return runTransaction(async () => {
    const newResource = await ResourceModel.create({
      ...resource,
      createdBy: userId,
    })

    return newResource
  })
}

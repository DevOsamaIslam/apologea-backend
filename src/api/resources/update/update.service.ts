import { runTransaction } from 'lib/helpers/transactions'
import { ResourceModel } from '../model/Resource.Model'
import { TUpdateResource } from '../resources.schema'

export const updateResourceService = async (params: { id: string; resource: TUpdateResource }) => {
  const { id, resource } = params

  return runTransaction(async () => {
    const existingResource = await ResourceModel.findById(id)

    if (!existingResource) {
      throw new Error('Resource not found')
    }

    Object.entries(resource).forEach(([key, value]) => {
      // @ts-expect-error
      existingResource[key] = value
    })

    await existingResource.save()
    return existingResource
  })
}

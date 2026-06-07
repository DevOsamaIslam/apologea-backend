import { ResourceModel } from '../model/Resource.Model'
import { z } from 'zod'
import { PaginationSchema } from '@constants'
import { mapToMongooseFilter } from '@helpers'

export const getResourcesService = async (
  params: z.infer<typeof PaginationSchema>,
  userId: string,
) => {
  const { limit, page, sort, filters, populate } = params

  const mappedFilters = mapToMongooseFilter(filters)

  return ResourceModel.paginate(
    {
      ...mappedFilters,
      $or: [
        {
          creatorId: userId,
        },
        {
          private: false,
        },
      ],
    },
    {
      limit,
      page,
      sort,
      populate,
    },
  )
}

export const getResourceBySlugService = async (params: { slug: string; populate: any }) => {
  const { slug, populate } = params
  const resource = await ResourceModel.findOne({ slug }).populate(populate).exec()

  return resource
}

export const getResourceByIdService = async (params: { id: string; populate: any }) => {
  const { id, populate } = params
  const resource = await ResourceModel.findById(id).populate(populate).exec()

  return resource
}

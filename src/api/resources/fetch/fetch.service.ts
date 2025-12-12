import { ResourceModel } from '../model/Resource.Model'
import { z } from 'zod'
import { PaginationSchema } from '@constants'
import { mapToMongooseFilter } from '@helpers'

export const getResourcesService = async (params: z.infer<typeof PaginationSchema>) => {
  const { limit, page, sort, filters, populate } = params
  const mappedFilters = mapToMongooseFilter(filters)

  return ResourceModel.paginate(mappedFilters, {
    limit,
    page,
    sort,
    populate,
  })
}

export const getResourceBySlugService = async (params: { slug: string; populate: any }) => {
  const { slug, populate } = params
  const resource = await ResourceModel.findOne({ slug }).populate(populate).exec()

  return resource
}

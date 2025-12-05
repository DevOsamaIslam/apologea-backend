import { OPERATORS } from '@constants'
import { FilterPayload, MongooseFilter } from 'lib/types/filters'

export const mapToMongooseFilter = (filterPayload: FilterPayload | undefined): MongooseFilter => {
  if (!filterPayload) return {}

  const mongooseFilter: MongooseFilter = {}

  Object.entries(filterPayload).forEach(([field, { operator, value }]) => {
    switch (operator) {
      case OPERATORS.equals:
        mongooseFilter[field] = { $eq: value }
        break
      case OPERATORS['not-equal']:
        mongooseFilter[field] = { $ne: value }
        break
      case OPERATORS.between:
        if (!Array.isArray(value)) break
        mongooseFilter[field] = { $gte: value[0], $lte: value[1] }
        break
      case OPERATORS.contains:
        mongooseFilter[field] = { $regex: value, $options: 'i' }
      // Add more operators as needed
    }
  })

  return mongooseFilter
}

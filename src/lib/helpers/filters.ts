import { FilterPayload, MongooseFilter } from 'lib/types/filters'

export const mapToMongooseFilter = (filterPayload: FilterPayload[] | undefined = [], prefix?: string): MongooseFilter => {
	const mongooseFilter: MongooseFilter = {}

	filterPayload.forEach(filter => {
		const { field, operator, value } = filter

		// If prefix is provided, prepend it to the field name
		const prefixedField = prefix ? `${prefix}.${field}` : field

		switch (operator) {
			case 'equals':
				mongooseFilter[prefixedField] = { $eq: value }
				break
			case 'not-equal':
				mongooseFilter[prefixedField] = { $ne: value }
				break
			case 'between':
				if (!Array.isArray(value)) break
				mongooseFilter[prefixedField] = { $gte: value[0], $lte: value[1] }
				break
			case 'contains':
				mongooseFilter[prefixedField] = { $regex: value, $options: 'i' }
			// Add more operators as needed
		}
	})

	return mongooseFilter
}

import { asyncHandler } from '@helpers'
import { IPaging } from '@types'
import { $filter } from 'lib/types/generic'
import User from '../model/User'
import { IUserDocument } from '../model/types'

export const fetchManyService = (filters: $filter, paging: IPaging) => {
	const parsedFilters: { [x: string]: unknown } = Object.keys(filters).reduce(
		(acc, key) => ({ ...acc, [`profile.${key}`]: filters[key] }),
		{},
	)
	return asyncHandler<IUserDocument[]>(User.find(filters, 'profile').paging(paging))
}

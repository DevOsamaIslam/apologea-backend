import { asyncHandler } from '@helpers'
import { IUser } from 'api/users/types'
import Article from '../model/Article'

type fn = (id: string, user: IUser) => ReturnType<typeof asyncHandler>

const deleteService: fn = (id, user) => {
	return asyncHandler(
		Article.deleteOne({
			_id: id,
			author: user.id,
		}),
	)
}

export default deleteService

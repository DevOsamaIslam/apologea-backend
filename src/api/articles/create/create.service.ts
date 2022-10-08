import { asyncHandler } from '@helpers'
import { IUser } from 'api/users/types'
import Article from '../model/Article'
import * as fake from '@ngneat/falso'

type createOneFn = (body: $body, user: IUser) => ReturnType<typeof asyncHandler<IUser>>

type $body = {
	title: string
	body: string
	excerpt?: string
	responseTo?: string
}
export const createOne: createOneFn = ({ title, body, excerpt, responseTo }, user) => {
	return asyncHandler(
		Article.create({
			title,
			body,
			excerpt,
			author: user.id,
			responseTo,
		}),
	)
}

export const fakeData = (user: IUser, count: number): ReturnType<typeof asyncHandler> => {
	const docs = []
	for (let i = 0; i < count; i++) {
		docs.push({
			title: fake.randJobTitle(),
			body: fake.randTextRange({ min: 100, max: 500 }),
			excerpt: fake.randTextRange({ min: 50, max: 200 }),
			author: user.id,
			// responseTo: req.body.responseTo,
		})
	}
	return asyncHandler(Article.create(docs))
}

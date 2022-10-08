import { asyncHandler } from '@helpers'

export type $filter = {
	[x: string]: any
}

export type $asyncHandlerReturn<R> = ReturnType<typeof asyncHandler<R>>

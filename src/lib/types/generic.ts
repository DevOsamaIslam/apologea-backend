import { asyncHandler } from '@helpers'
import { $roleLabel, $roleName } from './user'

export type $filter = {
	[x: string]: any
}

export type $asyncHandlerReturn<R> = ReturnType<typeof asyncHandler<R>>

export type $role = {
	[x in $roleName]: {
		permission: number
		label: $roleLabel
	}
}

export interface IDocumentTimestamp {
	createdAt: string
	updatedAt: string
}

import { PaginationSchema } from '@constants'

export type FilterPayload = Zod.infer<typeof PaginationSchema>['filters']['0']

export type MongooseFilter = Record<string, any>

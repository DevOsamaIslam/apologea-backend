import { PaginationSchema } from '@constants'
import z from 'zod'

export type FilterPayload = z.infer<typeof PaginationSchema.shape.filters>

export type MongooseFilter = Record<string, any>

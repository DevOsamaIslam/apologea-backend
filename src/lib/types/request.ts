import { PaginationSchema } from '@constants'
import { z } from 'zod'

export type TJWTPayload = {
  id: string
  iat: Date
  exp: Date
}

export type TPaginatedBody = z.infer<typeof PaginationSchema>

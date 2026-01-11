import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export const DB_SCHEMAS = {
  user: 'User',
  article: 'Article',
  comment: 'Comment',
  gallery: 'Gallery',
  debate: 'Debate',
  notification: 'Notification',
  resource: 'Resource',
} as const

// Extract types
const rangeValueType = [
  z.tuple([z.number(), z.number()]),
  z.tuple([z.string(), z.string()]),
  z.tuple([z.date(), z.date()]),
]

// Define operators that require a value
const operators = z.enum([
  'equals',
  'not-equal',
  'greater',
  'less-than',
  'greater-equal',
  'less-equal',
  'null',
  'not-null',
  'between',
  'contains',
])

export const OPERATORS = operators.enum

const populateBaseSchema = z.object({
  path: z.string(),
  select: z.array(z.string()).optional(),
})

const populateSchema = populateBaseSchema.extend({
  populate: populateBaseSchema.optional(),
})

export const PaginationSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().optional().default(10),
  sort: z
    .record(z.string(), z.enum(['asc', 'desc']))
    .default({ createdAt: 'desc' })
    .optional(),
  filters: z
    .record(
      z.string(),
      z.object({
        operator: operators,
        value: z.any(),
      }),
    )
    .optional()
    .default({}),

  populate: z.array(populateSchema).optional().default([]),
})

export const IdSchema = z.string().refine(val => isValidObjectId(val), {
  message: 'Invalid id',
})

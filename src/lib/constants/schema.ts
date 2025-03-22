import qs from 'qs'
import { z } from 'zod'

export const DB_SCHEMAS = {
  user: 'User',
  article: 'Article',
  comment: 'Comment',
  gallery: 'Gallery',
} as const

// Extract types
const rangeValueType = [z.tuple([z.number(), z.number()]), z.tuple([z.string(), z.string()]), z.tuple([z.date(), z.date()])]

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

const populateBaseSchema = z.object({
  path: z.string(),
  select: z.array(z.string()).optional(),
})

const populateSchema = populateBaseSchema.extend({
  populate: populateBaseSchema.optional(),
})

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(10),
  sort: z
    .string()
    .refine(val => val.split(',').length === 2, {
      message: "Sort value must be in the format 'field,direction'",
    })
    .transform(val => {
      const [field, direction] = val.split(',')
      const parsedDirection = parseInt(direction, 10)

      if (isNaN(parsedDirection) || (parsedDirection !== 1 && parsedDirection !== -1)) {
        throw new Error('Sort direction must be 1 or -1')
      }

      return {
        [field]: parsedDirection,
      }
    })
    .optional(),
  filters: z
    .array(
      z.object({
        field: z.string(),
        operator: operators, // add more operators as necessary
        value: z.union([z.string(), z.number(), z.date(), ...rangeValueType]),
      }),
    )
    .optional()
    .default([]),
  populate: z.array(populateSchema).optional().default([]),
})

import { Types } from 'mongoose'
import { z } from 'zod'
import { TArticleSchema } from './model/Articles.Model'

// Optional: DTO type for creating a new article (without `_id`)
export type CreateArticleDTO = Omit<TArticleSchema, '_id' | 'createdAt' | 'updatedAt'> & {
  author: Types.ObjectId
}

// Validate ObjectId
const objectIdSchema = z.string().refine(val => Types.ObjectId.isValid(val), { message: 'Invalid ObjectId' })

// Define Zod schema for an article
export const articleSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  likes: z.array(z.string()),
  author: objectIdSchema,
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  publishedAt: z.date().optional(),
})

export const createArticleSchema = articleSchema.pick({ title: true, content: true, published: true, tags: true })
export const updateArticleSchema = articleSchema.partial().required({ id: true })

// Infer TypeScript types from Zod
export type TCreateArticle = z.infer<typeof createArticleSchema>
export type TUpdateArticle = z.infer<typeof updateArticleSchema>

import { MAX_EXCERPT_LENGTH, MAX_TITLE_LENGTH } from 'app/settings'
import { Types } from 'mongoose'
import { z } from 'zod'
import { TArticleSchema } from './model/Article.Model'

// Optional: DTO type for creating a new article (without `_id`)
export type CreateArticleDTO = Omit<TArticleSchema, '_id' | 'createdAt' | 'updatedAt'> & {
  author: Types.ObjectId
}

// Validate ObjectId
const objectIdSchema = z.string().refine(val => Types.ObjectId.isValid(val), { message: 'Invalid ObjectId' })

// Define Zod schema for an article
const ArticleBaseSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(MAX_TITLE_LENGTH),
  content: z.string().min(10),
  excerpt: z.string().max(MAX_EXCERPT_LENGTH),
  likes: z.array(z.string()),
  author: objectIdSchema,
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  publishedAt: z.date().optional(),
  responseToId: z.string().optional(),
  responsesIds: z.array(z.string()),
})

export const ArticleSchema = ArticleBaseSchema.extend({
  responseTo: ArticleBaseSchema.optional(),
  responses: z.array(ArticleBaseSchema).optional(),
})

export const createArticleSchema = ArticleSchema.pick({
  title: true,
  content: true,
  excerpt: true,
  published: true,
  tags: true,
  responseToId: true,
})
export const updateArticleSchema = ArticleSchema.partial().required({ id: true })

// Infer TypeScript types from Zod
export type TCreateArticle = z.infer<typeof createArticleSchema>
export type TUpdateArticle = z.infer<typeof updateArticleSchema>

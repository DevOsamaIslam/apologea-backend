import { IdSchema } from '@constants'
import { MAX_EXCERPT_LENGTH, MAX_TITLE_LENGTH } from 'app/settings'
import { z } from 'zod'

// Define Zod schema for an article
const ArticleBaseSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(MAX_TITLE_LENGTH),
  excerpt: z.string().max(MAX_EXCERPT_LENGTH),
  content: z.string().min(10),
  html: z.string(),
  author: IdSchema,
  tags: z.array(z.string()).optional(),
  likes: z.array(z.string()),
  publishedAt: z.iso.datetime().optional(),
  responseToId: z.string().optional(),
  responsesIds: z.array(z.string()),
  debateId: z.string().optional(),
})

export const ArticleSchema = ArticleBaseSchema.extend({
  responseTo: ArticleBaseSchema.optional(),
  responses: z.array(ArticleBaseSchema).optional(),
})

export const createArticleSchema = ArticleSchema.pick({
  title: true,
  content: true,
  html: true,
  excerpt: true,
  tags: true,
  publishedAt: true,
  responseToId: true,
  debateId: true,
})

export const updateArticleSchema = ArticleSchema.partial()

// Infer TypeScript types from Zod
export type TCreateArticle = z.infer<typeof createArticleSchema>
export type TUpdateArticle = z.infer<typeof updateArticleSchema>

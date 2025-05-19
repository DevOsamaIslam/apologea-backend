import { MAX_DESCRIPTION_LENGTH, MAX_EXCERPT_LENGTH, MAX_TITLE_LENGTH } from 'app/settings'
import { Types } from 'mongoose'
import { z } from 'zod'
import { TDebateSchema } from './model/Debate.Model'
import { ArticleSchema } from 'api/articles/articles.schemas'
import { userSchema } from 'api/users/users.schema'

// Optional: DTO type for creating a new debate (without `_id`)
export type CreateDebateDTO = Omit<TDebateSchema, '_id' | 'createdAt' | 'updatedAt'> & {
  author: Types.ObjectId
}

// Validate ObjectId
const objectIdSchema = z.string().refine(val => Types.ObjectId.isValid(val), { message: 'Invalid ObjectId' })

// Define Zod schema for an debate
const DebateBaseSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(MAX_TITLE_LENGTH),
  slug: z.string(),
  description: z.string().max(MAX_DESCRIPTION_LENGTH),
  creatorId: z.string(),
  challengedId: z.string(),
  tags: z.array(z.string()).optional(),
  contentIds: z.array(z.string()),
  creator: userSchema.optional(),
  challenged: userSchema.optional(),
  contents: z.array(ArticleSchema).optional(),
})

export const DebateSchema = DebateBaseSchema.extend({
  responseTo: DebateBaseSchema.optional(),
  responses: z.array(DebateBaseSchema).optional(),
})

export const createDebateSchema = DebateSchema.pick({
  title: true,
  tags: true,
  description: true,
  challengedId: true,
})
export const updateDebateSchema = DebateSchema.partial().required({ id: true })

// Infer TypeScript types from Zod
export type TCreateDebate = z.infer<typeof createDebateSchema>
export type TUpdateDebate = z.infer<typeof updateDebateSchema>

import { userSchema } from 'api/users/users.schema'
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from 'app/settings'
import { z } from 'zod'

export const StageStructureSchema = z.object({
  rounds: z.number().int().positive(),
  startingUser: z.string(),
})

export const DebateStageSchema = z.object({
  userId: z.string(),
  articleId: z.string().optional(),
})

export const DebateSchema = z.object({
  id: z.string(),
  title: z.string().min(MIN_TITLE_LENGTH).max(MAX_TITLE_LENGTH),
  slug: z.string(),
  description: z.string().max(MAX_DESCRIPTION_LENGTH),
  creatorId: z.string(),
  challengedId: z.string(),
  tags: z.array(z.string()).optional().default([]),
  views: z.number().default(0),
  creator: userSchema.optional(),
  challenged: userSchema.optional(),
  stages: z.array(DebateStageSchema).default([]),
  next: z.string(),
  creatorVotes: z.array(z.string()).default([]),
  challengedVotes: z.array(z.string()).default([]),
  completedAt: z.iso.datetime().optional(),
})

export const createDebateSchema = DebateSchema.pick({
  title: true,
  tags: true,
  description: true,
  challengedId: true,
}).extend({
  structure: StageStructureSchema,
})

export const updateDebateSchema = DebateSchema.pick({
  id: true,
  title: true,
  description: true,
  tags: true,
})
  .partial()
  .required({ id: true })

// Infer TypeScript types from Zod
export type TCreateDebate = z.infer<typeof createDebateSchema>
export type TUpdateDebate = z.infer<typeof updateDebateSchema>

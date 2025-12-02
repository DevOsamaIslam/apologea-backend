import { userSchema } from 'api/users/users.schema'
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from 'app/settings'
import { z } from 'zod'

const stageNames = z.enum(['introduction', 'rebuttal', 'closing'])

export const StageSchema = z.object({
  name: stageNames,
  max: z.number().int().positive(),
  startingUser: z.string(),
})

const optionalStageSchema = StageSchema.partial({ max: true })

export const DEBATE_STRUCTURE = z.object({
  introduction: optionalStageSchema,
  rebuttals: StageSchema,
  closing: optionalStageSchema,
})

export const DebateStageSchema = z.object({
  name: stageNames,
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
  tags: z.array(z.string()).default([]),
  views: z.number().default(0),
  creator: userSchema.optional(),
  challenged: userSchema.optional(),
  completed: z.boolean(),
  stages: z.array(DebateStageSchema).default([]),
  next: z.string(),
  completedAt: z.string().datetime().optional(),
})

export const createDebateSchema = DebateSchema.pick({
  title: true,
  tags: true,
  description: true,
  challengedId: true,
  next: true,
}).extend({
  structure: z.array(StageSchema),
})

export const updateDebateSchema = DebateSchema.partial()

// Infer TypeScript types from Zod
export type TCreateDebate = z.infer<typeof createDebateSchema>
export type TUpdateDebate = z.infer<typeof updateDebateSchema>

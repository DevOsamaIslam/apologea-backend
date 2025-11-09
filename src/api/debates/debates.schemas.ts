import { userSchema } from 'api/users/users.schema'
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from 'app/settings'
import { z } from 'zod'

const stageNames = z.enum(['introduction', 'rebuttals', 'closing'])

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
  completed: z.boolean(),
})

export const DebateSchema = DebateBaseSchema.extend({
  responseTo: DebateBaseSchema.optional(),
  responses: z.array(DebateBaseSchema).optional(),
  stages: z.array(DebateStageSchema).default([]),
  next: z.string().optional(),
})

export const createDebateSchema = DebateSchema.pick({
  title: true,
  tags: true,
  description: true,
  challengedId: true,
  next: true,
}).extend({
  structure: z.array(StageSchema).optional(),
})

export const updateDebateSchema = DebateSchema.partial().required({ id: true })

// Infer TypeScript types from Zod
export type TCreateDebate = z.infer<typeof createDebateSchema>
export type TUpdateDebate = z.infer<typeof updateDebateSchema>

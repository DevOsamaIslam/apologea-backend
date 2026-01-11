import { userSchema } from 'api/users/users.schema'
import { MAX_EXCERPT_LENGTH, MAX_TITLE_LENGTH } from 'app/settings'
import { z } from 'zod'

// Define Zod schema for an resource
const ResourceSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(MAX_TITLE_LENGTH),
  description: z.string().max(MAX_EXCERPT_LENGTH),
  image: z.string().optional(),
  URL: z.url(),
  private: z.boolean().default(false),
  tags: z.array(z.string()).optional().default([]),
  creatorId: z.string(),
  creator: userSchema.optional(),
})

export const createResourceSchema = ResourceSchema.pick({
  title: true,
  description: true,
  image: true,
  URL: true,
  tags: true,
  private: true,
})

export const updateResourceSchema = ResourceSchema.partial()

// Infer TypeScript types from Zod
export type TResource = z.infer<typeof ResourceSchema>
export type TCreateResource = z.infer<typeof createResourceSchema>
export type TUpdateResource = z.infer<typeof updateResourceSchema>

import { z } from 'zod'

export const USER_ROLES = z.enum(['admin', 'publisher', 'reader', 'member', 'moderator'])

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  password: z.string(),
  roles: z.array(USER_ROLES).default([USER_ROLES.enum.reader]),
  articleIds: z.array(z.string()),
  reputation: z.number().default(0),
  verified: z.boolean().default(false),
  qualification: z.string().default(''),
  socials: z
    .object({
      university: z.string().optional(),
      website: z.string().optional(),
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      other: z.string().optional(),
    })
    .optional(),
  debateIds: z.array(z.string()),

  createdAt: z.date(),
  updatedAt: z.date(),
})

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type TLoginPayload = z.infer<typeof loginInput>

export const registrationInput = userSchema
  .extend({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter' })
      .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter' })
      .regex(/[0-9]/, { message: 'Password must include at least one number' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Password must include at least one special character' }),
  })
  .required({
    username: true,
    password: true,
    email: true,
    roles: true,
  })

export type TRegistrationPayload = z.infer<typeof registrationInput>

// DTOs (Data Transfer Objects) for API requests
export type RegisterUserDTO = z.infer<typeof registrationInput>
export type LoginUserDTO = z.infer<typeof loginInput>

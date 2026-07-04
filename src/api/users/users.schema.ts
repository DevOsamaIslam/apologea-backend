import { APOLOGIES_QUOTA } from 'app/settings'
import { z } from 'zod'

export const USER_ROLES = z.enum(['admin', 'publisher', 'reader', 'member', 'moderator'])

export const userSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  username: z.string(),
  email: z.email(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  password: z.string(),
  roles: z.array(USER_ROLES).default([USER_ROLES.enum.reader]),
  articleIds: z.array(z.string()),
  reputation: z.number().default(0),
  verification: z.object({
    code: z.string().nullable(),
    verifiedAt: z.iso.datetime().nullable(),
    lastTry: z.iso.datetime().nullable(),
  }),
  resetPassword: z.object({
    token: z.string().nullable(),
    expiresAt: z.iso.datetime().nullable(),
  }),
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
  followerIds: z.array(z.string()),
  followingIds: z.array(z.string()),

  apologiaQuota: z.number().default(APOLOGIES_QUOTA),

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const loginInput = z.object({
  email: z.email(),
  password: z.string(),
})

export type TUser = z.infer<typeof userSchema>

export type TLoginPayload = z.infer<typeof loginInput>

export const registrationInput = userSchema
  .pick({
    username: true,
    email: true,
    roles: true,
    bio: true,
    socials: true,
    qualification: true,
  })
  .extend({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter' })
      .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter' })
      .regex(/[0-9]/, { message: 'Password must include at least one number' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Password must include at least one special character' }),
  })

export type TRegistrationPayload = z.infer<typeof registrationInput>

export const ForgotPasswordPayload = z.object({
  email: z.email(),
})

export const VerifyTokenPayload = z.object({
  token: z.string(),
})

export const ResetPasswordPayload = z.object({
  token: z.string(),
  password: z.string(),
})

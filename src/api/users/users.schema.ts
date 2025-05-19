import { z } from 'zod'
import { TUser } from './model/User.Model'

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type TLoginPayload = z.infer<typeof loginInput>

export const registrationInput = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must include at least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must include at least one special character' }),
})

export type TRegistrationPayload = z.infer<typeof registrationInput>

// DTOs (Data Transfer Objects) for API requests
export type RegisterUserDTO = Pick<TUser, 'username' | 'email' | 'password'>
export type LoginUserDTO = Pick<TUser, 'email' | 'password'>

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  articleIds: z.array(z.string()),
  debateIds: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
})

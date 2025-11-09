import { z } from 'zod'
import { Document } from 'mongoose'

export interface Subscription extends Document {
  name: string
  monthlyPrice?: number
  annuallyPrice?: number
  description: string
  publisherId: string // ObjectId as string
}

export const SubscriptionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  monthlyPrice: z.number().optional(),
  annuallyPrice: z.number().optional(),
  description: z.string().min(1, 'Description is required'),
  publisherId: z.string().min(1, 'Publisher ID is required'),
})

export type SubscriptionPayload = z.infer<typeof SubscriptionSchema>

export const UpdateSubscriptionSchema = SubscriptionSchema.partial()
export type UpdateSubscriptionPayload = z.infer<typeof UpdateSubscriptionSchema>

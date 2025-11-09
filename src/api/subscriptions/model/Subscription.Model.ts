import { model } from 'mongoose'
import { SubscriptionDBSchema } from './Subscription.Schema'
import { Subscription } from '../types'

export const SubscriptionModel = model<Subscription>('Subscription', SubscriptionDBSchema)

import { DB_SCHEMAS } from '@constants'
import { Document, InferSchemaType, Schema } from 'mongoose'

export const SubscriptionDBSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    monthlyPrice: {
      type: Number,
      required: false,
      default: 0,
    },
    annualPrice: {
      type: Number,
      required: false,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    publisherId: {
      type: Schema.Types.ObjectId,
      ref: DB_SCHEMAS.user,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

export type TArticleSchema = InferSchemaType<typeof SubscriptionDBSchema>
export type TArticleDocument = Document<TArticleSchema>

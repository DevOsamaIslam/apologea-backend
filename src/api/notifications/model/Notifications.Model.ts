import { DB_SCHEMAS } from '@constants'
import mongoose, { InferSchemaType, Document, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const NotificationDBSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    type: { type: String, required: true },

    data: { type: Object, required: true },
  },
  { timestamps: true, versionKey: false },
)

NotificationDBSchema.plugin(paginate)

export type TNotificationSchema = InferSchemaType<typeof NotificationDBSchema>
export type TNotificationDocument = Document<TNotificationSchema>

export const NotificationModel = mongoose.model<
  TNotificationDocument,
  PaginateModel<TNotificationSchema>
>(DB_SCHEMAS.notification, NotificationDBSchema)

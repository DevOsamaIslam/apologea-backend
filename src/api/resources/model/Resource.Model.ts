import { DB_SCHEMAS } from '@constants'
import { Document, InferSchemaType, model, PaginateModel, Schema, Types } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

// Define the Mongoose schema
export const ResourceDBSchema = new Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    image: { type: String, default: '' },

    URL: { type: String, required: true },

    tags: { type: [String], default: [] },

    creatorId: { type: Types.ObjectId, ref: DB_SCHEMAS.user, required: true },

    private: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export type TResourceSchema = InferSchemaType<typeof ResourceDBSchema>
export type TResourceDocument = Document<TResourceSchema>

ResourceDBSchema.plugin(paginate)

export const ResourceModel = model<TResourceDocument, PaginateModel<TResourceSchema>>(
  DB_SCHEMAS.resource,
  ResourceDBSchema,
)

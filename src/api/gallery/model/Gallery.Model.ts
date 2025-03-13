import { DB_SCHEMAS } from '@constants'
import { HydratedDocument, InferSchemaType, PaginateModel, Schema, Types, model } from 'mongoose'

const GalleryDBSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: DB_SCHEMAS.user,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export type TGalleryItem = InferSchemaType<typeof GalleryDBSchema>
export type TGalleryItemDocument = HydratedDocument<TGalleryItem>

export const GalleryModel = model<TGalleryItemDocument, PaginateModel<TGalleryItem>>(DB_SCHEMAS.gallery, GalleryDBSchema)

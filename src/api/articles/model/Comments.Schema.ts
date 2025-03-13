import { DB_SCHEMAS } from '@constants'
import mongoose, { Document, InferSchemaType, PaginateModel, model } from 'mongoose'

const { ObjectId } = mongoose.SchemaTypes

const CommentSchema = new mongoose.Schema(
  {
    contents: {
      type: String,
      required: true,
    },
    article: {
      type: ObjectId,
      required: true,
    },
    author: {
      type: ObjectId,
      ref: DB_SCHEMAS.user,
      required: true,
    },
  },
  { timestamps: true },
)

export const CommentModel = model<TCommentDocument, PaginateModel<TCommentSchema>>('Article', CommentSchema)
export type TCommentSchema = InferSchemaType<typeof CommentSchema>
export type TCommentDocument = Document<TCommentSchema>

CommentSchema.index({ author: 'text', article: 'text' })

export default CommentSchema

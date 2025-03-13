import { DB_SCHEMAS } from '@constants'
import { Document, InferSchemaType, model, PaginateModel, Schema, Types } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { TCreateArticle } from '../articles.schemas'

// Define the Mongoose schema
export const ArticleDBSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    authorId: { type: Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: [{ type: Types.ObjectId, ref: DB_SCHEMAS.user, default: [] }],
    comments: [{ type: Types.ObjectId, ref: DB_SCHEMAS.comment, default: [] }],
    responseTo: {
      type: Types.ObjectId,
      ref: DB_SCHEMAS.article,
    },
    responses: [
      {
        type: Types.ObjectId,
        ref: DB_SCHEMAS.article,
        default: [],
      },
    ],
  },
  { timestamps: true },
)

ArticleDBSchema.index({
  author: 'text',
  responseTo: 'text',
})

// Virtual field for author (this will be populated on request)
ArticleDBSchema.virtual('author', {
  ref: DB_SCHEMAS.user, // Model to populate the author from
  localField: 'authorId', // Field from the Post model (authorId) to use as the reference
  foreignField: '_id', // The field from the User model to match (default is _id)
  justOne: true, // One-to-one relationship
})

// Ensure virtuals are included in JSON responses
ArticleDBSchema.set('toJSON', { virtuals: true })

export type TArticleSchema = InferSchemaType<typeof ArticleDBSchema>
export type TArticleDocument = Document<TArticleSchema>

ArticleDBSchema.plugin(paginate)

export const ArticleModel = model<TArticleDocument, PaginateModel<TArticleSchema>>(DB_SCHEMAS.article, ArticleDBSchema)

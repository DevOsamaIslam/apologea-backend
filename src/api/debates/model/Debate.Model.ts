import { DB_SCHEMAS } from '@constants'
import { Document, InferSchemaType, model, PaginateModel, Schema, Types } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

// Define the Mongoose schema
export const DebateDBSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    creatorId: { type: Types.ObjectId, ref: 'User', required: true },
    challengedId: { type: Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    contentIds: [
      {
        type: Types.ObjectId,
        ref: DB_SCHEMAS.article,
      },
    ],
  },
  { timestamps: true },
)

DebateDBSchema.index({
  creatorId: 'text',
  challengedId: 'text',
})

// Virtual field for author (this will be populated on request)
DebateDBSchema.virtual('creator', {
  ref: DB_SCHEMAS.user, // Model to populate the author from
  localField: 'creatorId', // Field from the Post model (authorId) to use as the reference
  foreignField: '_id', // The field from the User model to match (default is _id)
  justOne: true, // One-to-one relationship
})

DebateDBSchema.virtual('challenged', {
  ref: DB_SCHEMAS.user,
  localField: 'challengedId',
  foreignField: '_id',
  justOne: true,
})

DebateDBSchema.virtual('contents', {
  ref: DB_SCHEMAS.article,
  localField: 'contentIds',
  foreignField: '_id',
  justOne: false,
})

// Ensure virtuals are included in JSON responses
DebateDBSchema.set('toJSON', { virtuals: true })

export type TDebateSchema = InferSchemaType<typeof DebateDBSchema>
export type TDebateDocument = Document<TDebateSchema>

DebateDBSchema.plugin(paginate)

export const DebateModel = model<TDebateDocument, PaginateModel<TDebateSchema>>(DB_SCHEMAS.debate, DebateDBSchema)

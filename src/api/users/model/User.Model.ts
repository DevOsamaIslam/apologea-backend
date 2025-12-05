import { AUTH, DB_SCHEMAS } from '@constants'
import { hash } from 'bcrypt'
import mongoose, { HydratedDocument, InferSchemaType, PaginateModel, Types, model } from 'mongoose'
import { USER_ROLES } from '../users.schema'
import paginate from 'mongoose-paginate-v2'

export const UserDBSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    photo: { type: String },
    password: { type: String, required: true }, // Hashed password
    resetPasswordToken: { type: String },
    articleIds: [{ type: Types.ObjectId, ref: DB_SCHEMAS.article, default: [] }],
    bio: { type: String, default: '' },
    reputation: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [String],
      enum: Object.values(USER_ROLES.Values),
      default: [USER_ROLES.enum.reader],
    },
    qualification: { type: String, default: '' },
    socials: {
      university: String,
      website: String,
      facebook: String,
      twitter: String,
      others: String,
    },
    debateIds: [{ type: Types.ObjectId, ref: DB_SCHEMAS.debate, default: [] }],
  },
  { timestamps: true },
)

UserDBSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, AUTH.saltRounds)
    this.resetPasswordToken = undefined
  }

  next()
})

UserDBSchema.plugin(paginate)

export type TUserSchema = InferSchemaType<typeof UserDBSchema>
export type TUserDocument = HydratedDocument<TUserSchema>

export const UserModel = model<TUserDocument, PaginateModel<TUserSchema>>(
  DB_SCHEMAS.user,
  UserDBSchema,
)

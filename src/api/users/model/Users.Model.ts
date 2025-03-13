import { AUTH, DB_SCHEMAS } from '@constants'
import { hash } from 'bcrypt'
import mongoose, { HydratedDocument, InferSchemaType, Types, model } from 'mongoose'

export const UserSchema = new mongoose.Schema(
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
  },
  { timestamps: true },
)

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, AUTH.saltRounds)
    this.resetPasswordToken = undefined
  }

  next()
})

export const UserModel = model(DB_SCHEMAS.user, UserSchema)

export type TUser = InferSchemaType<typeof UserSchema>
export type TUserDocument = HydratedDocument<TUser>

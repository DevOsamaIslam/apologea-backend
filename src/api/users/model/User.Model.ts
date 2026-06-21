import { AUTH, DB_SCHEMAS } from '@constants'
import { hash } from 'bcrypt'
import mongoose, { HydratedDocument, InferSchemaType, PaginateModel, Types, model } from 'mongoose'
import { USER_ROLES } from '../users.schema'
import paginate from 'mongoose-paginate-v2'
import { autoPopulateVirtuals } from 'app/db/plugins/populate'
import { addStringIds } from 'app/db/plugins/stringId'
import { APOLOGIES_QUOTA } from 'app/settings'
import { sensitiveFieldsPlugin } from 'app/db/plugins/sanitize'

mongoose.plugin(autoPopulateVirtuals)
mongoose.plugin(addStringIds)
mongoose.plugin(sensitiveFieldsPlugin)

export const UserDBSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },

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

    verification: {
      type: {
        code: {
          type: String,
          default: null,
        },
        verifiedAt: { type: Date, default: null },
        lastTry: { type: Date, default: null },
      },
      required: true,
      default: {},
    },

    roles: {
      type: [String],
      enum: Object.values(USER_ROLES.enum),
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

    followingIds: [{ type: Types.ObjectId, ref: DB_SCHEMAS.user, default: [] }],

    followerIds: [{ type: Types.ObjectId, ref: DB_SCHEMAS.user, default: [] }],

    apologiaQuota: {
      type: Number,
      default: APOLOGIES_QUOTA,
    },
  },
  { timestamps: true },
)

UserDBSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, AUTH.saltRounds)
    this.resetPasswordToken = undefined
  }
})

UserDBSchema.plugin(paginate)

export type TUserSchema = InferSchemaType<typeof UserDBSchema>
export type TUserDocument = HydratedDocument<TUserSchema>

export const UserModel = model<TUserDocument, PaginateModel<TUserSchema>>(
  DB_SCHEMAS.user,
  UserDBSchema,
)

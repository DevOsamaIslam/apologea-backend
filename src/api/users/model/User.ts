import { schemaNames } from '#lib/constants'
import mongoose from 'mongoose'
import Schema from './Schema'
// import UserValidation from './User.validation.js'

export default mongoose.model(schemaNames.user, Schema)

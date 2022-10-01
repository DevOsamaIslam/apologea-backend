import { SCHEMAS } from '@constants'
import Schema from './Schema'
import mongoose from 'mongoose'

// import UserValidation from './User.validation.js'

export default mongoose.model(SCHEMAS.user, Schema)

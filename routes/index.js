import express from 'express'

import { asyncHandler } from '../config/utils.js'
import auth from './auth/index.js'

const rt = express.Router()

rt.use('/auth', auth)



export default rt
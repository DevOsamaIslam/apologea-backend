import express from 'express'

import create from './create.js'

const rt = express.Router()

rt.use('/new', create)

export default rt
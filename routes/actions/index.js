import express from 'express'

import like from './like.js'
import comment from './comment.js'
import affirm from './affirm.js'
const rt = express.Router()


rt.use('/like', like)
rt.use('/comment', comment)
rt.use('/affirm', affirm)


export default rt
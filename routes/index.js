import express from 'express'

import auth from './auth/index.js'
import user from './profile/index.js'
import blog from './blog/index.js'

const rt = express.Router()

rt.use('/auth', auth)
rt.use('/user', user)
rt.use('/blog', blog)


export default rt
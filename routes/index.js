import express from 'express'

import auth from './auth/index.js'
import user from './profile/index.js'
import blog from './blog/index.js'
import actions from './actions/index.js'
import feed from './feed.js'
import { authed } from '../lib/utils.js'

const rt = express.Router()

rt.use('/auth', auth)
rt.use('/feed', feed)
rt.use('/user', authed, user)
rt.use('/blog', authed, blog)
rt.use('/actions', authed, actions)


export default rt
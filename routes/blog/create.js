import express from 'express'

import blogCreate from '../../api/blog/blog.create.js'
import { authed } from '../../lib/utils.js'

const rt = express.Router()

rt.post('/', authed, blogCreate)

export default blogCreate
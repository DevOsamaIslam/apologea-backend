import express from 'express'

import blogCreate from '../../api/blog/blog.create.js'

const rt = express.Router()

rt.post('/', blogCreate)

export default blogCreate
import express from 'express'
import blogUpdate from '../../api/blog/blog.update.js'
const rt = express.Router()


rt.patch('/', blogUpdate)


export default rt
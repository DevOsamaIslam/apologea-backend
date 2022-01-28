import express from 'express'
import blogDelete from '../../api/blog/blog.delete.js'
const rt = express.Router()


rt.delete('/', blogDelete)


export default rt
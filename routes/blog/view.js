import express from 'express'
import blogView from '../../api/blog/blog.view.js'
const rt = express.Router()


rt.get('/', blogView)


export default rt
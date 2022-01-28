import express from 'express'
const rt = express.Router()
import feed from '../api/feed.js'

rt.get('/', feed)

export default rt
import express from 'express'
import actionsComment from '../../api/actions/actions.comment.js'
const rt = express.Router()


rt.post('/', actionsComment)


export default rt
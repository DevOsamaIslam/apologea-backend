import express from 'express'
import actionsLike from '../../api/actions/actions.like.js'
const rt = express.Router()


rt.post('/', actionsLike)


export default rt
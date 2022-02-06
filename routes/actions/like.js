import express from 'express'
import actionsLike from '../../api/actions/actions.like.js'
const rt = express.Router()


rt.patch('/', actionsLike)


export default rt
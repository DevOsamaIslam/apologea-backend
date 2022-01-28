import express from 'express'
import actionsAffirm from '../../api/actions/actions.affirm.js'
const rt = express.Router()


rt.post('/', actionsAffirm)


export default rt
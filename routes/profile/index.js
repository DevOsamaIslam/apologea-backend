import express from 'express'
import getUser from '../../api/profile/profile.getUser.js'
const rt = express.Router()

rt.get('/', getUser)


export default rt
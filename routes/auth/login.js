import express from 'express'

import loginUser from '../../api/auth/auth.login.js'

const rt = express.Router()

rt.post('/', loginUser)


export default rt
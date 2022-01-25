import express from 'express'

import registerUser from '../../api/auth/auth.register.js'

const rt = express.Router()

rt.post('/', registerUser)


export default rt
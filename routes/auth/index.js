import express from 'express'

import register from './register.js'
import login from './login.js'

const rt = express.Router()

rt.use('/register', register)
rt.use('/login', login)


export default rt
import express from 'express'

import register from './register.js'
import login from './login.js'
import strings from '../../lib/strings.js'
import isAuthed from '../../api/auth/auth.isAuthed.js'

const rt = express.Router()

rt.use('/register', register)
rt.use('/login', login)

rt.get('/logout', (req, res) => {
	req.logOut()
	res.json({message: strings.successKey})
})

rt.get('/isAuthed', isAuthed)


export default rt
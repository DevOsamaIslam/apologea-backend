import express from 'express'

import register from './register.js'
import login from './login.js'
import strings from '../../lib/strings.js'
import isAuthed from '../../api/auth/auth.isAuthed.js'
import { feedback, returnHandler } from '../../lib/utils.js'

const rt = express.Router()

rt.use('/register', register)
rt.use('/login', login)

rt.get('/logout', (req, res, next) => {
	req.logOut()
	return next(
		returnHandler(
			200,
			null,
			feedback(strings.success.key, strings.success.logout)
		)
	)
})

rt.get('/isAuthed', isAuthed)


export default rt
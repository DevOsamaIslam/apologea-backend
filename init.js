import express from 'express'
import db from './lib/db.js'
import session from 'express-session'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import cors from 'cors'

import passportConfig from './lib/passport.js'

export default app => {
	app.use(express.json())
	app.use(express.urlencoded({ extended: false}))
	app.use(cors())

	db.connect()
	const store = MongoStore.create({
		client: db.connection.getClient(),
		collectionName: 'sessions'
	})

	app.use(session({
		secret: 'ksnkdsfjksdjvc',
		resave: false,
		saveUninitialized: true,
		store,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24
		}
	}))

	app.use(passport.initialize())
	app.use(passport.session())
	passportConfig



}
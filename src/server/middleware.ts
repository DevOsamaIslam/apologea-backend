import { basePath } from '#lib/constants'
import express, { Express } from 'express'
import router from '#/router'
import database from '#/db/config'
import { Mongoose } from 'mongoose'
import passport from 'passport'
import passportConfig from '#/config/passport'

export default (server: Express) => {
	server.use(express.json())
	database.connect().then((dbClient: Mongoose) => {
		// add database depending middleware here
		dbClient
		database.setDebug(true)
	})
	server.use(passport.initialize())
	passportConfig(passport)
	server.use(basePath, router)
}

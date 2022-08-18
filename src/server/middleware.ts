import passportConfig from 'config/passport'
import database from 'db/config'
import router from 'router'
import { BASE_PATH } from '@constants'
import express, { Express } from 'express'
import { Mongoose } from 'mongoose'
import passport from 'passport'

export default (server: Express) => {
	server.use(express.json())
	database.connect().then((dbClient: Mongoose) => {
		// add database depending middleware here
		dbClient
		database.setDebug(true)
	})
	server.use(passport.initialize())
	passportConfig(passport)
	server.use(BASE_PATH, router)
}

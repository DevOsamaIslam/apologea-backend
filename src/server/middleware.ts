import passportConfig from 'config/passport'
import database from 'config/db'
import router from 'router'
import { BASE_PATH } from '@constants'
import express, { Express } from 'express'
import { Mongoose } from 'mongoose'
import passport from 'passport'
import { useCache } from 'config/cache'

export default (server: Express) => {
	server.use(express.json())
	database.connect().then((dbClient: Mongoose) => {
		// add database depending middleware here
		useCache(dbClient)
		database.setDebug(true)
	})
	server.use(passport.initialize())
	passportConfig(passport)
	server.use(BASE_PATH, router)
}

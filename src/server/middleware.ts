import passportConfig from 'config/passport'
import database from 'config/db'
import router from 'router'
import { BASE_PATH } from '@constants'
import express, { Express } from 'express'
import { Mongoose } from 'mongoose'
import passport from 'passport'
import cacheMiddleware from 'middleware/cache.middleware'
import pagingMiddleware from 'middleware/paging.middleware'

export default (server: Express) => {
	server.use(express.json())
	database.connect().then((dbClient: Mongoose) => {
		// add database depending middleware here
		cacheMiddleware(dbClient)
		pagingMiddleware(dbClient)
		database.setDebug(true)
	})
	server.use(passport.initialize())
	passportConfig(passport)
	server.use(BASE_PATH, router)
}

import database from 'app/db'
import migrations from 'app/migrations'
import outpost from 'app/outpost'
import passportConfig from 'app/passport'
import router from 'app/router'
import { BASE_PATH } from 'app/settings'
import cors from 'cors'
import express, { Express } from 'express'
import { addLoginMiddleware } from 'middleware/auth.middleware'
import { fileUploadMiddleware } from 'middleware/fileUpload.middleware'
import mongoose from 'mongoose'
import passport from 'passport'
import path from 'path'
import { initViewFlusher } from 'api/articles/views/views.service'

mongoose.set('strictQuery', true)

const corsOptions = {
  origin: '*', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTION'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}

export default (server: Express) => {
  server.use(cors(corsOptions))
  database.connect().then(dbClient => {
    // add database depending middleware here
    // hookCache(dbClient)
    // Initialise the background view flusher (connects Redis and starts periodic flush)
    initViewFlusher()
    database.setDebug(true)
  })
  server.use(passport.initialize())
  passportConfig(passport)
  server.use(addLoginMiddleware)

  outpost()
  migrations()



  server.use(fileUploadMiddleware)
  server.use((req, res, next) => {
    if (req.is('multipart/form-data')) next()
    else {
      express.json({ limit: '1mb' })(req, res, next)
    }
  })
  server.use(BASE_PATH, router)
}

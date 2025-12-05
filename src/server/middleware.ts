import database, { addId2schemas } from 'app/db'
import passportConfig from 'app/passport'
import router from 'app/router'
import { BASE_PATH } from 'app/settings'
import cors from 'cors'
import express, { Express } from 'express'
import { fileUploadMiddleware } from 'middleware/fileUpload.middleware'
import mongoose from 'mongoose'
import passport from 'passport'
import path from 'path'

mongoose.set('strictQuery', true)

const corsOptions = {
  origin: '*', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}

export default (server: Express) => {
  server.use(cors(corsOptions))
  server.use(express.static(path.join(__dirname, '../public')))
  database.connect().then(dbClient => {
    // add database depending middleware here
    // hookCache(dbClient)
    mongoose.plugin(addId2schemas)
    dbClient?.set('strictQuery', true)
    database.setDebug(true)
  })
  server.use(passport.initialize())
  passportConfig(passport)
  server.use(fileUploadMiddleware)
  server.use((req, res, next) => {
    if (req.is('multipart/form-data')) next()
    else {
      express.json()(req, res, next)
    }
  })
  server.use(BASE_PATH, router)
}

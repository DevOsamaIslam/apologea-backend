import express, { Express } from 'express'
import addMiddleware from './middleware'

export const server = () => {
  const app = express()

  addMiddleware(app)

  const port = process.env.PORT || 4500

  const cb = () => console.log(`Server started on port ${port}`)

  app.listen(port, cb)

  return app
}

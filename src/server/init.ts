import addMiddleware from './middleware'
import express from 'express'

export const server = () => {
  const app = express()

  addMiddleware(app)

  const port = process.env.PORT || 4500

  const cb = () => console.log(`Server started on port ${port}`)

  app.listen(port, cb)

  return app
}

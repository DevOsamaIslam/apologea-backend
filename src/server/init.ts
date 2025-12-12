import http from 'http'
import addMiddleware from './middleware'
import express from 'express'
import SocketServer from 'app/socket'

export const server = () => {
  const app = express()

  addMiddleware(app)

  const port = process.env.PORT || 4500

  const httpServer = http.createServer(app)

  SocketServer.init(httpServer)

  const cb = () => console.log(`Server started on port ${port}`)

  httpServer.listen(port, cb)

  return app
}

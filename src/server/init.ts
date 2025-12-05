import addMiddleware from './middleware'
import express from 'express'
import { createServer } from 'http'
import { socketManager } from '../app/socket'

export const server = () => {
  const app = express()

  addMiddleware(app)

  const port = process.env.PORT || 4500

  // Create HTTP server
  const httpServer = createServer(app)

  // Initialize Socket.IO server after HTTP server is created
  try {
    socketManager.initialize(httpServer)
    console.log('Socket.IO server initialized successfully')
  } catch (error) {
    console.error('Failed to initialize Socket.IO server:', error)
    process.exit(1)
  }

  const cb = () => {
    console.log(`Server started on port ${port}`)
    console.log(`Socket.IO server is listening on port ${port}`)
  }

  // Start HTTP server (Socket.IO will use the same server instance)
  httpServer.listen(port, cb)

  return app
}

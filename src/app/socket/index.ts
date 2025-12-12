import { Server, Socket } from 'socket.io'
import type { Server as HttpServer } from 'http'

class SocketServer {
  private static io: Server | null = null

  // userId → socketId mapping
  private static userSockets = new Map<string, Socket>()

  public static init(httpServer: HttpServer): Server {
    if (!this.io) {
      this.io = new Server(httpServer, {
        cors: { origin: '*' },
      })

      this.io.on('connection', (socket: Socket) => {
        console.log('Client connected:', socket.id)

        // Expect client to send its userId on connect
        socket.on('login', (userId: string) => {
          SocketServer.userSockets.set(userId, socket)
          console.log(`Registered user ${userId} -> ${socket.id}`)
        })

        socket.on('logout', (userId: string) => {
          SocketServer.userSockets.delete(userId)
          console.log(`Unregistered user ${userId} -> ${socket.id}`)
        })

        socket.on('disconnect', () => {
          for (const [userId, sock] of SocketServer.userSockets.entries()) {
            if (sock === socket) {
              SocketServer.userSockets.delete(userId)
              break
            }
          }
          console.log('Client disconnected:', socket.id)
        })
      })
    }

    return this.io
  }

  public static getIO(): Server {
    if (!this.io) throw new Error('Socket.io not initialized.')
    return this.io
  }

  // --- Helper: send to a specific user ---
  public static sendToUser(userId: string, event: string, payload: any) {
    if (!this.io) return

    const socket = this.userSockets.get(userId)
    if (!socket) {
      console.warn(`User ${userId} not connected`)
      return
    }

    socket.emit(event, payload)
  }

  // --- Helper: broadcast to all users ---
  public static broadcast(event: string, payload: any) {
    if (!this.io) return
    this.io.emit(event, payload)
  }
}

export default SocketServer

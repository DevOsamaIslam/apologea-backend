import { Server as SocketIOServer, Socket } from 'socket.io'
import { IConnectionManager, SocketUser, ConnectionEvent } from 'lib/types/socket'

export class ConnectionManager implements IConnectionManager {
  private userSocketMap = new Map<string, string>() // userId -> socketId
  private socketUserMap = new Map<string, string>() // socketId -> userId
  private io: SocketIOServer | null = null

  public initialize(io: SocketIOServer): void {
    this.io = io
  }

  public handleConnection(socket: Socket): void {
    console.log(`Client connected: ${socket.id}`)

    // Set up authentication handler
    socket.on('authenticate', (data: { userId: string }) => {
      this.handleAuthentication(socket, data.userId)
    })

    // Set up disconnection handler
    socket.on('disconnect', () => {
      this.handleDisconnection(socket)
    })

    // Set up error handler
    socket.on('error', (error: Error) => {
      console.error(`Socket error for ${socket.id}:`, error)
    })
  }

  public handleAuthentication(socket: Socket, userId: string): boolean {
    if (!this.io) {
      console.warn('Socket.IO server not initialized')
      return false
    }

    // Remove old socket mapping if exists
    const oldSocketId = this.userSocketMap.get(userId)
    if (oldSocketId) {
      this.socketUserMap.delete(oldSocketId)
    }

    // Add new mapping
    this.userSocketMap.set(userId, socket.id)
    this.socketUserMap.set(socket.id, userId)

    console.log(`User ${userId} authenticated with socket ${socket.id}`)

    // Notify user of successful authentication
    socket.emit('authenticated', { userId, socketId: socket.id })

    // Broadcast user connection to others
    this.broadcastConnectionEvent({
      type: 'connect',
      userId,
      socketId: socket.id,
      timestamp: Date.now(),
    })

    return true
  }

  public handleDisconnection(socket: Socket): void {
    const userId = this.socketUserMap.get(socket.id)

    if (userId) {
      this.userSocketMap.delete(userId)
      this.socketUserMap.delete(socket.id)

      console.log(`User ${userId} disconnected`)

      // Broadcast user disconnection
      this.broadcastConnectionEvent({
        type: 'disconnect',
        userId,
        socketId: socket.id,
        timestamp: Date.now(),
      })
    }

    console.log(`Client disconnected: ${socket.id}`)
  }

  public getUserSocketId(userId: string): string | undefined {
    return this.userSocketMap.get(userId)
  }

  public isUserConnected(userId: string): boolean {
    return this.userSocketMap.has(userId)
  }

  public getConnectedUsers(): SocketUser[] {
    const users: SocketUser[] = []
    this.userSocketMap.forEach((socketId, userId) => {
      users.push({ userId, socketId })
    })
    return users
  }

  private broadcastConnectionEvent(event: ConnectionEvent): void {
    if (!this.io) return

    this.io.emit('user-connection', event)
  }

  public clear(): void {
    this.userSocketMap.clear()
    this.socketUserMap.clear()
  }
}

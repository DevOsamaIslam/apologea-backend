import { Server as SocketIOServer } from 'socket.io'
import { IMessageManager, SocketMessageType } from 'lib/types/socket'
import { ConnectionManager } from './ConnectionManager'

export class MessageManager implements IMessageManager {
  private io: SocketIOServer | null = null
  private connectionManager: ConnectionManager

  constructor(connectionManager: ConnectionManager) {
    this.connectionManager = connectionManager
  }

  public initialize(io: SocketIOServer): void {
    this.io = io
  }

  public sendToUser(userId: string, type: SocketMessageType, data: unknown): boolean {
    if (!this.io) {
      console.warn('Socket.IO server not initialized')
      return false
    }

    const socketId = this.connectionManager.getUserSocketId(userId)
    if (!socketId) {
      console.warn(`User ${userId} not connected`)
      return false
    }

    const socket = this.io.sockets.sockets.get(socketId)
    if (!socket) {
      console.warn(`Socket ${socketId} not found for user ${userId}`)
      return false
    }

    socket.emit('message', {
      type,
      data,
      timestamp: Date.now(),
    })

    return true
  }

  public broadcast(type: SocketMessageType, data: unknown): void {
    if (!this.io) {
      console.warn('Socket.IO server not initialized')
      return
    }

    this.io.emit('message', {
      type,
      data,
      timestamp: Date.now(),
    })
  }
}

import { Server } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { Socket } from 'socket.io'
import { ConnectionManager } from './ConnectionManager'
import { MessageManager } from './MessageManager'
import { MessageHandlerRegistry } from './MessageHandlerRegistry'
import { NewArticleHandler } from './handlers/NewArticleHandler'
import { NewDebateHandler } from './handlers/NewDebateHandler'
import { ChallengedHandler } from './handlers/ChallengedHandler'
import { NewResponseHandler } from './handlers/NewResponseHandler'

class SocketManager {
  private static instance: SocketManager
  private io: SocketIOServer | null = null
  private connectionManager: ConnectionManager
  private messageManager: MessageManager
  private messageHandlerRegistry: MessageHandlerRegistry
  private isInitialized = false

  private constructor() {
    this.connectionManager = new ConnectionManager()
    this.messageManager = new MessageManager(this.connectionManager)
    this.messageHandlerRegistry = new MessageHandlerRegistry()
    this.initializeMessageHandlers()
  }

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager()
    }
    return SocketManager.instance
  }

  public initialize(server: Server): void {
    if (this.isInitialized) {
      console.warn('Socket.IO server already initialized')
      return
    }

    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
      },
      transports: ['websocket', 'polling'],
    })

    // Initialize managers
    this.connectionManager.initialize(this.io)
    this.messageManager.initialize(this.io)

    // Set up connection handlers
    this.setupConnectionHandlers()

    this.isInitialized = true
    console.log('Socket.IO server initialized')
  }

  private setupConnectionHandlers(): void {
    if (!this.io) return

    this.io.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`)
      this.connectionManager.handleConnection(socket)

      // Handle message events
      socket.on('message', async message => {
        await this.messageHandlerRegistry.handleMessage(socket, message.type, message.data)
      })
    })
  }

  private initializeMessageHandlers(): void {
    // Register built-in message handlers
    this.messageHandlerRegistry.register('new-article', new NewArticleHandler())
    this.messageHandlerRegistry.register('new-debate', new NewDebateHandler())
    this.messageHandlerRegistry.register(
      'challenged',
      new ChallengedHandler(this.connectionManager),
    )
    this.messageHandlerRegistry.register('new-response', new NewResponseHandler())
  }

  // Public API methods - delegate to appropriate managers
  public sendToUser(userId: string, type: string, data: unknown): boolean {
    return this.messageManager.sendToUser(userId, type as any, data)
  }

  public broadcast(type: string, data: unknown): void {
    this.messageManager.broadcast(type as any, data)
  }

  public getConnectedUsers() {
    return this.connectionManager.getConnectedUsers()
  }

  public isUserConnected(userId: string): boolean {
    return this.connectionManager.isUserConnected(userId)
  }

  public getUserSocketId(userId: string): string | undefined {
    return this.connectionManager.getUserSocketId(userId)
  }

  public registerHandler(messageType: string, handler: any): void {
    this.messageHandlerRegistry.register(messageType, handler)
  }

  public unregisterHandler(messageType: string): void {
    this.messageHandlerRegistry.unregister(messageType)
  }

  public shutdown(): void {
    if (this.io) {
      this.io.close()
      this.io = null
      this.connectionManager.clear()
      this.messageHandlerRegistry.clear()
      this.isInitialized = false
      console.log('Socket.IO server shut down')
    }
  }
}

// Export singleton instance
export const socketManager = SocketManager.getInstance()

// Export classes for external use
export { ConnectionManager } from './ConnectionManager'
export { MessageManager } from './MessageManager'
export { MessageHandlerRegistry } from './MessageHandlerRegistry'
export { MessageHandler } from './MessageHandler'
export * from './handlers'

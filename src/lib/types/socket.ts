import { Socket } from 'socket.io'
import { Server as SocketIOServer } from 'socket.io'

// Core socket interfaces
export interface SocketMessage {
  type: string
  data: unknown
  timestamp: number
}

export interface SocketUser {
  userId: string
  socketId: string
}

// Message handler interface
export interface IMessageHandler<T = unknown> {
  handle(socket: Socket, data: T): Promise<void> | void
}

// Connection events
export interface ConnectionEvent {
  type: 'connect' | 'disconnect' | 'authenticate'
  userId?: string
  socketId: string
  timestamp: number
}

// Message types
export type SocketMessageType =
  | 'new-article'
  | 'new-debate'
  | 'challenged'
  | 'new-response'
  | 'user-connected'
  | 'user-disconnected'

// Message data interfaces
export interface NewArticleMessage {
  articleId: string
  title: string
  authorId: string
  authorName: string
  createdAt: Date
}

export interface NewDebateMessage {
  debateId: string
  title: string
  initiatorId: string
  initiatorName: string
  createdAt: Date
}

export interface ChallengedMessage {
  challengeId: string
  debateId: string
  challengerId: string
  challengerName: string
  challengedUserId: string
  message: string
  createdAt: Date
}

export interface NewResponseMessage {
  responseId: string
  debateId: string
  responderId: string
  responderName: string
  content: string
  createdAt: Date
}

// Manager interfaces
export interface IConnectionManager {
  initialize(io: SocketIOServer): void
  handleConnection(socket: Socket): void
  handleDisconnection(socket: Socket): void
  handleAuthentication(socket: Socket, userId: string): boolean
  getUserSocketId(userId: string): string | undefined
  isUserConnected(userId: string): boolean
  getConnectedUsers(): SocketUser[]
}

export interface IMessageManager {
  sendToUser(userId: string, type: SocketMessageType, data: unknown): boolean
  broadcast(type: SocketMessageType, data: unknown): void
}

export interface IMessageHandlerRegistry {
  register(messageType: string, handler: IMessageHandler): void
  unregister(messageType: string): void
  getHandler(messageType: string): IMessageHandler | undefined
}

// Configuration interfaces
export interface SocketConfig {
  cors: {
    origin: string
    methods: string[]
    credentials: boolean
  }
  transports: string[]
}

// Event interfaces
export interface SocketEventMap {
  connection: (socket: Socket) => void
  disconnect: (reason: string) => void
  authenticate: (data: { userId: string }) => void
  message: (message: SocketMessage) => void
  error: (error: Error) => void
  'join-room': (data: { room: string }) => void
  'leave-room': (data: { room: string }) => void
}

// Error types
export interface SocketError {
  message: string
  code?: string
  details?: unknown
}

// Utility types
export type MessageHandlerMap = Map<string, IMessageHandler>
export type UserSocketMap = Map<string, string>
export type SocketUserMap = Map<string, string>

/**
 * Socket.IO Integration Example
 *
 * This file demonstrates how to integrate the SocketManager
 * into your existing Express routes and services.
 */

import { socketManager } from '.'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { returnHandler, feedback } from '@helpers'
import { SUCCESS } from '@constants'
import { MessageHandler } from './MessageHandler'
import { Socket } from 'socket.io'

// Example: Notify users about new article
export const notifyNewArticle: RequestHandler = async (req, res, next) => {
  try {
    const { articleId, title, authorId, authorName } = req.body

    // Send notification to all connected clients
    socketManager.broadcast('new-article', {
      articleId,
      title,
      authorId,
      authorName,
      createdAt: new Date(),
    })

    return next(returnHandler(StatusCodes.OK, null, feedback('success', SUCCESS.created)))
  } catch (error) {
    return next(error)
  }
}

// Example: Send challenge notification to specific user
export const sendChallengeNotification = async (
  challengerId: string,
  challengerName: string,
  challengedUserId: string,
  debateId: string,
  message: string,
) => {
  const success = socketManager.sendToUser(challengedUserId, 'challenged', {
    challengeId: `challenge_${Date.now()}`,
    debateId,
    challengerId,
    challengerName,
    challengedUserId,
    message,
    createdAt: new Date(),
  })

  return success
}

// Example: Custom message handler using new architecture
class TypingHandler extends MessageHandler<{ userId: string; isTyping: boolean }> {
  constructor() {
    super('typing')
  }

  async handle(socket: Socket, data: { userId: string; isTyping: boolean }): Promise<void> {
    const { userId, isTyping } = data

    // Broadcast typing status to all users except sender
    socket.broadcast.emit('message', {
      type: 'user-typing',
      data: { userId, isTyping },
      timestamp: Date.now(),
    })
  }
}

// Example: Custom message handler registration
export const registerCustomHandlers = () => {
  // Register a custom handler for 'typing' events
  socketManager.registerHandler('typing', new TypingHandler())
}

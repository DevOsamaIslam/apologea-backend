import { IMessageHandler, IMessageHandlerRegistry } from 'lib/types/socket'
import { Socket } from 'socket.io'

export class MessageHandlerRegistry implements IMessageHandlerRegistry {
  private handlers = new Map<string, IMessageHandler>()

  public register(messageType: string, handler: IMessageHandler): void {
    this.handlers.set(messageType, handler)
  }

  public unregister(messageType: string): void {
    this.handlers.delete(messageType)
  }

  public getHandler(messageType: string): IMessageHandler | undefined {
    return this.handlers.get(messageType)
  }

  public async handleMessage(socket: Socket, messageType: string, data: unknown): Promise<void> {
    const handler = this.getHandler(messageType)
    if (!handler) {
      console.warn(`No handler found for message type: ${messageType}`)
      socket.emit('error', { message: `Unknown message type: ${messageType}` })
      return
    }

    try {
      await handler.handle(socket, data)
    } catch (error) {
      console.error('Error handling message:', error)
      socket.emit('error', {
        message: 'Failed to process message',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  public getRegisteredTypes(): string[] {
    return Array.from(this.handlers.keys())
  }

  public clear(): void {
    this.handlers.clear()
  }
}

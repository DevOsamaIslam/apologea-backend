import { Socket } from 'socket.io'
import { IMessageHandler } from 'lib/types/socket'

export abstract class MessageHandler<T = unknown> implements IMessageHandler<T> {
  protected readonly messageType: string

  constructor(messageType: string) {
    this.messageType = messageType
  }

  public abstract handle(socket: Socket, data: T): Promise<void> | void

  protected emitToSocket(socket: Socket, event: string, data: unknown): void {
    socket.emit(event, {
      data,
      timestamp: Date.now(),
    })
  }

  protected getMessageType(): string {
    return this.messageType
  }
}

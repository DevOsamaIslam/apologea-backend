import { Socket } from 'socket.io'
import { MessageHandler } from '../MessageHandler'
import { ChallengedMessage } from 'lib/types/socket'
import { ConnectionManager } from '../ConnectionManager'

export class ChallengedHandler extends MessageHandler<ChallengedMessage> {
  private connectionManager: ConnectionManager

  constructor(connectionManager: ConnectionManager) {
    super('challenged')
    this.connectionManager = connectionManager
  }

  public async handle(socket: Socket, data: ChallengedMessage): Promise<void> {
    console.log('User challenged:', data)

    // Send to specific user if challengedUserId is provided
    if (data.challengedUserId) {
      const targetSocketId = this.connectionManager.getUserSocketId(data.challengedUserId)
      if (targetSocketId) {
        const targetSocket = socket.nsp.sockets.get(targetSocketId)
        if (targetSocket) {
          this.emitToSocket(targetSocket, 'challenged', {
            ...data,
            timestamp: Date.now(),
          })
        }
      }
    }
  }
}

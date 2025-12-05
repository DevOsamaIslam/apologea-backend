import { Socket } from 'socket.io'
import { MessageHandler } from '../MessageHandler'
import { NewDebateMessage } from 'lib/types/socket'

export class NewDebateHandler extends MessageHandler<NewDebateMessage> {
  constructor() {
    super('new-debate')
  }

  public async handle(socket: Socket, data: NewDebateMessage): Promise<void> {
    console.log('New debate created:', data)
  }
}

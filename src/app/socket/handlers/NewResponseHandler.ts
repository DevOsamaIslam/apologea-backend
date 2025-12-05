import { Socket } from 'socket.io'
import { MessageHandler } from '../MessageHandler'
import { NewResponseMessage } from 'lib/types/socket'

export class NewResponseHandler extends MessageHandler<NewResponseMessage> {
  constructor() {
    super('new-response')
  }

  public async handle(socket: Socket, data: NewResponseMessage): Promise<void> {
    console.log('New response created:', data)
  }
}

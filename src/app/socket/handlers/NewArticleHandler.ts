import { Socket } from 'socket.io'
import { MessageHandler } from '../MessageHandler'
import { NewArticleMessage } from 'lib/types/socket'

export class NewArticleHandler extends MessageHandler<NewArticleMessage> {
  constructor() {
    super('new-article')
  }

  public async handle(socket: Socket, data: NewArticleMessage): Promise<void> {
    console.log('New article created:', data)
  }
}

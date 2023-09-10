import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageService } from './message.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { Repository } from 'typeorm';

interface MessagePayload {
  conversationId: string;
  content: string;
}

@WebSocketGateway()
export class MessageGateway {
  constructor(
    private readonly messageService: MessageService,
    @InjectRepository(Conversation)
    private conversationRepo: Repository<Conversation>,
  ) {}
  @SubscribeMessage('send-message')
  async handleSendingMessage(socket: Socket, payload: MessagePayload) {
    try {
      const message = await this.messageService.create(
        payload.conversationId,
        payload.content,
      );
      await this.conversationRepo.update(payload.conversationId, {
        lastMessage: message,
      });
      socket.broadcast
        .to(payload.conversationId)
        .emit('reply-message', payload.content);
    } catch (error) {
      console.log(error);
      socket.broadcast
        .to(payload.conversationId)
        .emit('reply-message', 'fail!');
    }
  }

  @SubscribeMessage('delete-message')
  async handleDeletingMessage(socket: Socket, payload: any) {
    try {
      await this.messageService.delete(payload.id);
    } catch (error) {}
  }
}

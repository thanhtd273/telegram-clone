import {
  BaseWsExceptionFilter,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { In, Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { validate } from 'class-validator';
import { UseFilters } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@WebSocketGateway()
export class ConversationGateway {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly conversationService: ConversationService,
  ) {}

  @UseFilters(new BaseWsExceptionFilter())
  @SubscribeMessage('create-conversation')
  async handleCreateConversation(socket: Socket, payload: any) {
    try {
      const userIds = payload.ids;
      const conversation = await this.conversationService.create(userIds);
      socket
        .to(conversation.id)
        .emit('reply-message', 'conversation was created');
    } catch (error) {
      socket.emit('reply-message', 'creation fail');
      throw new WsException(error);
    }
  }

  @SubscribeMessage('join-conversation')
  handleJoin(socket: Socket, payload: any) {
    socket.join(payload.conversationId);
    console.log(socket.rooms);
  }
  @SubscribeMessage('leave-conversation')
  handleLeave(socket: Socket, payload: any) {
    console.log(socket.rooms);
    socket.leave(payload.conversationId);
    console.log(socket.rooms);
  }
}

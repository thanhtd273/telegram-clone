import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { Message } from './entities/message.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation])],
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
})
export class MessageModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConversationService } from './conversation.service';
import { ConversationGateway } from './conversation.gateway';
import { Conversation } from './entities/conversation.entity';
import { User } from 'src/user/entities/user.entity';
import { ConversationController } from './conversation.controller';
import { Message } from 'src/message/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, User, Message])],
  providers: [ConversationService, ConversationGateway],
  controllers: [ConversationController],
})
export class ConversationModule {}

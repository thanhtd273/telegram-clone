import { UpsertType as User } from 'typeorm/driver/types/UpsertType';
import { MessageType } from '../entities/message.entity';
import { ConversationType as Conversation } from 'src/conversation/interfaces/conversation.interface';

export class MessageDto {
  readonly id: string;
  readonly conversationId: string;
  readonly content: string;
  readonly type?: MessageType;
  readonly isDeleted?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly user?: User[];
  readonly repliedMessage?: Conversation;
  readonly replyingMessage?: Conversation;
  readonly tags?: User[];
  readonly pinnedConversation?: Conversation;
}

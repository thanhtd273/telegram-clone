import { UserType as User } from 'src/user/interfaces/user.interface';
import { MessageType } from '../entities/message.entity';
import { ConversationType as Conversation } from 'src/conversation/interfaces/conversation.interface';

interface Message {
  id: string;
  conversationId: string;
  content: string;
  type?: MessageType;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: User;
  repliedMessage?: Message;
  replyingMessage?: Message;
  tags?: User[];
  pinnedConversation?: Message;
}

export type { Message };

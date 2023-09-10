import { ConversationType as Conversation } from 'src/conversation/interfaces/conversation.interface';

interface UserType {
  id: string;
  name?: string;
  username?: string;
  phone?: string;
  password?: string;
  passwordConfirm?: string;
  avatar?: string;
  online?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createdConversations?: Conversation[];
  adminedConversations?: Conversation[];
  friends?: UserType[];
}

export type { UserType };

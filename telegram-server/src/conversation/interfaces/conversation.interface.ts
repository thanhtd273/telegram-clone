import { Message } from 'src/message/interfaces/message.interface';
import { UserType as User } from 'src/user/interfaces/user.interface';

interface ConversationType {
  id: string;
  name?: string;
  avatar?: string;
  isGroup?: boolean;
  isJoinFromLink?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  admins?: User[];
  members?: User[];
  lastMessage?: Message;
  pinnedMessages?: Message[];
}

export type { ConversationType };

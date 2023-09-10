import { Message } from 'src/message/interfaces/message.interface';
import { UserType as User } from 'src/user/interfaces/user.interface';

export class ConversationDto {
  readonly id: string;
  readonly name?: string;
  readonly avatar?: string;
  readonly isGroup?: boolean;
  readonly isJoinFromLink?: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly memberIds?: string[];
  readonly admins?: User[];
  readonly lastMessage?: Message;
  readonly pinnedMessages?: Message[];
}

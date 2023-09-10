import { ConversationType as Conversation } from 'src/conversation/interfaces/conversation.interface';
import { Message } from 'src/message/interfaces/message.interface';
import { UserType as User } from '../interfaces/user.interface';

export class UserDto {
  readonly id: string;
  readonly name?: string;
  readonly username?: string;
  readonly phone?: string;
  readonly password?: string;
  readonly passwordConfirm?: string;
  readonly avatar?: string;
  readonly online?: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly encryptPassword?: () => void;
  readonly setDefault?: () => void;

  readonly messages?: Message[];
  readonly createdConversations?: Conversation[];
  readonly adminedConversations?: Conversation[];
  readonly friends?: User[];
}

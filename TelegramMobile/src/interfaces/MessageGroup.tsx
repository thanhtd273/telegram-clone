import {Message} from './Message';

interface MessageGroup {
  userId: string;
  messages: Message[];
}

export type {MessageGroup};

import {Message} from '../interfaces/Message';
import {MessageGroup} from '../interfaces/MessageGroup';

export const formatTimeSeen = (date: Date) => {
  const dayPassed = Math.round(
    (new Date().getTime() - date.getTime()) / (24 * 60 * 60 * 1000),
  );
  if (dayPassed === 0) {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } else if (dayPassed === 1) {
    return `Yesterday, ${new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)}`;
  } else
    return new Intl.DateTimeFormat('vi-VN', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    }).format(date);
};

export const groupMessagesByUserId = (messages: Message[]): MessageGroup[] => {
  const result: MessageGroup[] = [
    {
      userId: messages[0].userId,
      messages: [messages[0]],
    },
  ];

  let index = 0;
  for (let i = 1; i < messages.length; i++) {
    const message = messages[i];
    if (message.userId !== result[index]?.userId) {
      index++;
      result.push({
        userId: message.userId,
        messages: [message],
      });
    } else {
      result[index].messages?.push(message);
    }
  }
  return result;
};

export const addMessage = (list: MessageGroup[], message: Message) => {
  const lastIndex = list.length - 1;
  if (message.userId === list[lastIndex].userId)
    list[lastIndex].messages.push(message);
  else {
    list.push({
      userId: message.userId,
      messages: [message],
    });
  }
  return list;
};

interface Message {
  id?: string;
  conversationId?: string;
  content: string;
  type?: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
  repliedMessageId?: string;
  pinedConversationId?: string;
}

export type {Message};

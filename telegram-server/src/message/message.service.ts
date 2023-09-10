import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
  ) {}
  async create(conversationId: string, content: string) {
    try {
      const messageInfor = this.messageRepository.create({
        content,
        conversation: conversationId,
      });
      const errors = await validate(messageInfor);
      if (errors.length > 0) {
        console.log(errors);
        throw new Error('Validate message failed!');
      }
      const message = await this.messageRepository.save(messageInfor);
      return message;
    } catch (error) {
      console.log(error);
      throw new ConflictException(error);
    }
  }
  async delete(id: string) {
    try {
      await this.messageRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new ConflictException(error);
    }
  }
}

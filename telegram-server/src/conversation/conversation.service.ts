import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/message/entities/message.entity';
import { ConversationType } from './interfaces/conversation.interface';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,

    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async create(userIds: string[]) {
    try {
      if (userIds.length < 2 || !Array.isArray(userIds))
        throw new Error(
          'The number of members is not enough to create new conversation!',
        );
      const users = await this.userRepo.find({
        where: { id: In(userIds) },
      });
      if (!users) throw new Error('Users belong to those ids does not exist!');
      const converInfor = this.conversationRepo.create({
        admins: users,
        members: users,
      });
      const errors = await validate(converInfor);
      if (errors.length > 0) {
        console.log(errors);
        throw new Error('Conversation valiation fail!');
      }
      const conversation = await this.conversationRepo.save(converInfor);
      return conversation;
    } catch (error) {
      console.log(error);
      throw new ConflictException(error);
    }
  }

  async getAll() {
    try {
      const conversations = await this.conversationRepo.find({
        relations: { members: true, admins: true },
      });
      if (!conversations) throw new Error('Cannot get conversations!');
      return conversations;
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async get(id: string) {
    try {
      const conversation = await this.conversationRepo.findOneBy({ id });
      if (!conversation) throw new Error('Not found conversation!');
      return conversation;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, data: ConversationType) {
    const allowanceFields = [
      'name',
      'avatar',
      'isGroup',
      'isJoinFromLink',
      'updatedAt',
    ];
    Object.keys(data).forEach(
      (field) => !allowanceFields.includes(field) && delete data[field],
    );
    await this.conversationRepo.update(id, { ...data });
    return await this.conversationRepo.findBy({ id });
  }

  async delete(id: string) {
    await this.conversationRepo.delete(id);
  }
  async addMembers(id: string, ...userIds: string[]) {
    try {
      const conversation = await this.conversationRepo.findOne({
        where: { id },
        relations: { members: true },
      });

      // Remove all user have already existed in
      userIds = userIds.filter(
        (id) => !conversation.members.some((member) => member.id === id),
      );
      const users = await this.userRepo.find({ where: { id: In(userIds) } });
      if (users.length === 0) return conversation;
      console.log(conversation);
      if (!conversation) throw new Error('Cannot find the conversation!');

      conversation.members.push(...users);
      const errors = await validate(conversation);
      if (errors.length > 0) {
        console.log(errors);
        throw new Error('Validate conversation failed!');
      }
      const newConversa = await this.conversationRepo.save(conversation);
      return newConversa;
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async pinMessage(id: string, messageId: string) {
    try {
      const conversation = await this.conversationRepo.findOne({
        where: {
          id,
        },
        relations: {
          pinMessages: true,
        },
      });
      if (!conversation) throw new Error('Not found the conversation!');

      if (conversation.pinMessages.some((message) => message.id === messageId))
        return conversation;
      const message = await this.messageRepo.findOneBy({
        id: messageId,
        conversation: id,
      });
      if (!message)
        throw new Error("Message doesn't belong to this conversation");
      conversation.pinMessages.push(message);
      return await this.messageRepo.save(conversation);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}

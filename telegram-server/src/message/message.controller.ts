import { Body, Controller, Post, Res } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { Repository } from 'typeorm';

@Controller('api/v1/message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
  ) {}

  @Post()
  async createMessage(
    @Body() message: MessageDto,
    @Res() res: Response,
  ): Promise<Response> {
    const newMessage = await this.messageService.create(
      message.conversationId,
      message.content,
    );
    return res.status(200).json({
      status: 'success',
      message: newMessage,
    });
  }
}

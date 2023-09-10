import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationDto } from './dto/conversation.dto';
import { Response } from 'express';
import { MessageDto } from 'src/message/dto/message.dto';

@Controller('api/v1/conversations')
export class ConversationController {
  constructor(private readonly converService: ConversationService) {}
  @Post()
  async create(
    @Body() converData: ConversationDto,
    @Res() res: Response,
  ): Promise<Response> {
    const conversation = await this.converService.create(converData.memberIds);

    return res.status(200).json({
      status: 'success',
      conversation,
    });
  }

  @Get()
  async getAll(@Res() res: Response): Promise<Response> {
    const conversations = await this.converService.getAll();
    return res.status(200).json({
      status: 'success',
      result: conversations.length,
      conversations,
    });
  }

  @Get(':id')
  async get(@Res() res: Response, @Param('id') id: string): Promise<Response> {
    const conversation = await this.converService.get(id);
    return res.status(200).json({
      status: 'success',
      conversation,
    });
  }

  // @Post('add-members')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: ConversationDto,
    @Res() res: Response,
  ): Promise<Response> {
    const conversation = await this.converService.update(id, data);
    return res.status(200).json({
      status: 'success',
      conversation,
    });
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.converService.delete(id);
    return res.status(200).json({
      status: 'success',
      conversation: null,
    });
  }

  @Post('/pin')
  async pinMessage(
    @Body() message: MessageDto,
    @Res() res: Response,
  ): Promise<Response> {
    const conversation = await this.converService.pinMessage(
      message.conversationId,
      message.id,
    );
    return res.status(200).json({
      status: 'success',
      conversation,
    });
  }
}

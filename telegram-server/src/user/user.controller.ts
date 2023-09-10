import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers(@Res() res: Response): Promise<Response> {
    const users = await this.userService.getAllUsers();
    return res.status(200).json({
      status: 'success',
      result: users.length,
      users,
    });
  }

  @Get(':id')
  async getUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    return res.status(200).json({
      status: 'success',
      user: await this.userService.getUser(id),
    });
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() data: UserDto,
  ): Promise<Response> {
    const user = await this.userService.updateUser(id, data);
    return res.status(200).json({
      status: 'sucess',
      user,
    });
  }

  @Delete(':id')
  async delete(@Res() res: Response, @Param('id') id: string) {
    await this.userService.deleteUser(id);
    return res.status(200).json({
      status: 'success',
      user: null,
    });
  }
}

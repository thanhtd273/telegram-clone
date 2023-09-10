import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { Response } from 'express';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { CredentialDto } from './dto/credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  // @UseFilters(new HttpExceptionFilter())
  async signUp(@Body() data: UserDto, @Res() res: Response): Promise<Response> {
    const user = await this.authService.signUp(data);
    if (!user) throw new Error('Cannot create new user!');
    return res.status(201).json({
      status: 'success',
      token: user.token,
      user: user.data,
    });
  }

  @Post('login')
  async login(
    @Body() data: CredentialDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.login(data);
    if (!user) throw new Error("User doesn't exist!");
    return res.status(201).json({
      status: 'success',
      token: user.token,
      user: user.data,
    });
  }
}

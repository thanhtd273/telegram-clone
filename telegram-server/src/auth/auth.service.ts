import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
const { promisify } = require('util');
import * as jwt from 'jsonwebtoken';

import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UserType } from 'src/user/interfaces/user.interface';
import { validate } from 'class-validator';
import { CredentialDto } from './dto/credential.dto';
import { NextFunction } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  private signToken(id: string) {
    return sign({ id }, this.configService.get('JWT_SECRET'), {
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });
  }
  private createAndSendToken(user: User) {
    const token = this.signToken(user.id);
    return { token, data: user };
  }
  async signUp(data: UserType) {
    try {
      const user = this.userRepository.create(data);

      const errors = await validate(user, {
        validationError: { target: false },
      });
      if (errors.length > 0) {
        console.log(errors);
        const message = errors
          .map((error) => Object.values(error.constraints))
          .join(' | ');
        throw new Error(message);
      }

      const res = await this.userRepository.save(user);
      if (!res) throw new Error('Cannot create user!');

      return this.createAndSendToken(user);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async login(credetial: CredentialDto) {
    try {
      const user = await this.userRepository.findOne({
        select: {
          password: true,
          id: true,
          username: true,
          name: true,
          phone: true,
          avatar: true,
          online: true,
        },
        where: { phone: credetial.phone },
      });
      const correctPassword = await bcrypt.compare(
        credetial.password,
        user.password,
      );
      if (!correctPassword) throw new Error('Phone or password is invalid!');

      return this.createAndSendToken(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async protect(token: string, next: NextFunction) {
    try {
      if (!token || token === null) throw new Error('You are not logged in!');

      const decoded = await promisify(jwt.verify)(
        token,
        this.configService.get('JWT_SECRET'),
      );

      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });
      if (!user)
        throw new Error('The user belongs to this user doest no longer exist!');
      return user;
    } catch (error) {
      next(new UnauthorizedException(error));
    }
  }
}

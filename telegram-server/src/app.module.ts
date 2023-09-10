import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { React } from './message/entities/react.entity';
import { ConversationModule } from './conversation/conversation.module';
import { Conversation } from './conversation/entities/conversation.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/http-exception.filter';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'telegram',
        entities: [User, Message, React, Conversation],
        synchronize: true,
      }),
    }),
    AuthModule,
    MessageModule,
    ConversationModule,
  ],

  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}

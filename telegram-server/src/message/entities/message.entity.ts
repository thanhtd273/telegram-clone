import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { React } from './react.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';

export enum MessageType {
  'TEXT',
  'VOICE',
  'FILE',
  'STICKER',
  'IMAGE',
}

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  conversation: string;

  @Column()
  @Index()
  content: string;

  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.TEXT,
    enumName: 'message type',
  })
  type: MessageType;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Message, (message) => message.replyingMessages)
  repliedMessage: Message;

  @OneToMany(() => Message, (message) => message.repliedMessage)
  replyingMessages: Message[];

  @ManyToMany(() => User, (user) => user.id, { cascade: true })
  @JoinTable()
  tags: User[];

  @OneToMany(() => Message, (message) => message.id)
  pinMessages: Message[];

  @OneToMany(() => React, (react) => react.id, { cascade: true })
  reacts: React[];

  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  pinnedConversation: Conversation;
}

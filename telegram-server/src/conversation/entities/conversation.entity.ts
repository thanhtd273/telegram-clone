import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  isGroup: boolean;

  @Column({ default: false })
  isJoinFromLink: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable({ name: 'admin' })
  admins: User[];

  @ManyToMany(() => User, (user) => user.id, { cascade: true })
  @JoinTable({ name: 'member' })
  members: User[];

  @OneToOne(() => Message, (message) => message.id)
  @JoinColumn()
  lastMessage: Message;

  @OneToMany(() => Message, (message) => message.id)
  pinMessages: Message[];

  @OneToMany(() => Message, (message) => message.id)
  messages: Message[];

  @BeforeInsert()
  setGroup() {
    if (this.members.length === 2) this.isGroup = false;
    else this.isGroup = true;
  }

  @BeforeInsert()
  setConversationName() {
    if (!this.isGroup) this.name = this.id;
  }
}

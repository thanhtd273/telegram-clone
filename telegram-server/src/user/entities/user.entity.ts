import { MaxLength, MinLength, ValidationArguments } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { IsValidPassword } from 'src/decorators/isValidPassword';
import { Message } from 'src/message/entities/message.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { IsPhone } from 'src/decorators/isPhone';

@Entity({ name: 'account' })
export class User {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'user-id-constraint',
  })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @MinLength(10, { message: 'Name is too short!' })
  @MaxLength(50, { message: 'Name is too long!' })
  name: string;

  @Column({ nullable: true })
  @Index()
  username: string;

  @Column({
    type: 'varchar',
    length: 10,
    foreignKeyConstraintName: 'unique-phone',
  })
  @Unique('unique-phone-constraint', ['phone'])
  @IsPhone({
    message: (args: ValidationArguments) =>
      `${args.value} is not a phone number`,
  })
  phone: string;

  @Column({ select: false })
  // @IsStrongPassword({ minLength: 8 }, { message: 'Password is too weak!' })
  password: string;

  @IsValidPassword('password', { message: 'Password is invalid!' })
  @Column({ select: false })
  passwordConfirm: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: true })
  online: boolean;

  @Column({ name: 'created_at', default: new Date() })
  // @IsDate()
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true, type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Message, (message) => message.id)
  messages: Message[];

  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  createdConversations: Conversation[];

  @ManyToMany(() => Conversation, (conversation) => conversation.id)
  adminedConversations: Conversation[];

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable({
    name: 'friend',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'menberId' },
  })
  friends: User[];

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = await bcrypt.hash(this.password, 12);
  }

  @BeforeInsert()
  setDefault() {
    this.username = this.name.toUpperCase();
  }

  // @BeforeInsert()
  // validateUser(res: Response) {
  //   validate(this).then((errors) => {
  //     if (errors.length > 0) console.log(res);
  //   });
  // }
}

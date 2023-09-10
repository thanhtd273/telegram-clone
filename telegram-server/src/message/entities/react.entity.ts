import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class React {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @ManyToOne(() => Message, (message) => message.id)
  message: Message;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

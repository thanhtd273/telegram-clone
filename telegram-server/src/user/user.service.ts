import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserType } from './interfaces/user.interface';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }
  async getUser(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new Error('Cannot find the user!');
    return user;
  }
  async updateUser(id: string, data: UserType): Promise<User> {
    const allowanceFields = [
      'name',
      'username',
      'phone',
      'avatar',
      'online',
      'updatedAt',
    ];
    Object.keys(data).forEach(
      (field) => !allowanceFields.includes(field) && delete data[field],
    );
    await this.userRepo.update(id, { ...data });
    const user = this.userRepo.findOne({ where: { id } });
    return user;
  }

  async deleteUser(id: string) {
    await this.userRepo.delete(id);
  }
}

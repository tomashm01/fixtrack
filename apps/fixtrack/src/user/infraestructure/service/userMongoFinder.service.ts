import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { USER_PROJECTION, UserDocument } from '../projection';
import { UserDTO } from '@fixtrack/contracts';
import { UserEmail, UserId } from '../../domain';

export const USER_MONGO_FINDER = 'UserMongoFinder';

@Injectable()
export class UserMongoFinder {
  constructor(
    @InjectModel(USER_PROJECTION) private readonly users: Model<UserDocument>
  ) {}

  async findAll(): Promise<UserDTO[]> {
    const users = await this.users.find().exec();
    return users.map(user => new UserDTO(user));
  }

  async findByEmail(email: UserEmail): Promise<UserDTO | null> {
    const user = await this.users.findOne({ email: email.value }).exec();
    return user ? new UserDTO(user) : null;
  }

  async deleteUser(id: UserId): Promise<boolean> {
    await this.users.deleteOne({ _id: id.value }).exec();
    return true;
  }

  async updateUserPassword(id: UserId, password: string): Promise<void> {
    await this.users.updateOne({ _id: id.value }, { password }).exec();
  }
}

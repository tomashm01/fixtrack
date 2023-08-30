import { Model } from "mongoose";
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";

import { USER_PROJECTION, UserDocument } from "../projection";
import { UserFinder } from "../../application/service/user-finder.service";
import { UserDTO } from "@fixtrack/contracts";
import { UserEmail, UserId } from "../../domain";

@Injectable()
export class UserMongoFinder implements UserFinder{
  constructor(
    @InjectModel(USER_PROJECTION) private readonly users: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDTO[]> {
    const users = await this.users.find().exec();
    return users.map((user) => new UserDTO(user));
  }
  
  async findByEmail(email: UserEmail): Promise<UserDTO | null> {
    const user = await this.users.findOne({email:email.value}).exec();
    return user ? new UserDTO(user) : null;
  }

  async findById(id: UserId): Promise<UserDTO | null> {
    const user = await this.users.findById(id.value).exec();
    return user ? new UserDTO(user) : null;
  }

}
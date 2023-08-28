import { Injectable } from "@nestjs/common";
import { UserFinder } from "../../application/service/user-finder.service";
import { UserDTO } from "@fixtrack/contracts";

@Injectable()
export class UserInMemory implements UserFinder{
  constructor(){}

  private users: UserDTO[] = [
    {
      id: '1',
      email: 'ejemplo1@gmail.com',
      password: '123456',
      role: 'admin',
    },
    {
      id: '2',
      email: 'pepe@email.com',
      password: '123456',
      role: 'user',
    },
  ];

  async findAll(): Promise<UserDTO[]> {
    return this.users;
  }
}
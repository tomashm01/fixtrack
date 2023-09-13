import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UserDTO } from '@fixtrack/contracts';
import { GetUsersQuery } from '../../application/query/get-users.query';
import { CreateUserCommand } from '../../application/command/create-user.command';
import { GetUserByIdQuery } from '../../application/query/get-user-by-id.query';
import { GetUserByEmailQuery } from '../../application/query/get-user-by-email.query';
import { DeleteUserCommand } from '../../application/command/delete-user.command';
import { UserId } from '../../domain';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async getUsers(): Promise<UserDTO[]> {
    return await this.queryBus.execute<IQuery, UserDTO[]>(new GetUsersQuery());
  }

  async createUser(userdto: CreateUserDTO): Promise<UserDTO> {
    return await this.commandBus.execute(
      new CreateUserCommand(
        userdto._id,
        userdto.email,
        userdto.password,
        userdto.role
      )
    );
  }

  async getUserById(id: string): Promise<UserDTO | null> {
    return await this.queryBus.execute<IQuery, UserDTO>(
      new GetUserByIdQuery(id)
    );
  }

  async getUserByEmail(email: string): Promise<UserDTO | null> {
    return await this.queryBus.execute<IQuery, UserDTO>(
      new GetUserByEmailQuery(email)
    );
  }

  async deleteUser(id: UserId): Promise<boolean> {
    return await this.commandBus.execute(new DeleteUserCommand(id.value));
  }
}

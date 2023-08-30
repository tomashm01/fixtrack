import { CommandBus, IQuery, QueryBus } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { CreateUserDTO, UserDTO } from "@fixtrack/contracts";
import { GetUsersQuery } from "../../application/query/get-users.query";
import { CreateUserCommand } from "../../application/command/create-user.command";
import { GetUserByIdQuery } from "../../application/query/get-user-by-id.query";

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  async getUsers(): Promise<UserDTO[]> {
    return await this.queryBus.execute<IQuery, UserDTO[]>(new GetUsersQuery());
  }

  async createUser(userdto: CreateUserDTO) : Promise<UserDTO> {
    await this.commandBus.execute(new CreateUserCommand(userdto._id,userdto.email, userdto.password, userdto.role));
    return new UserDTO({...userdto});
  }

  async getUserById(id: string): Promise<UserDTO | null> {
    return await this.queryBus.execute<IQuery, UserDTO>(new GetUserByIdQuery(id));
  }
}
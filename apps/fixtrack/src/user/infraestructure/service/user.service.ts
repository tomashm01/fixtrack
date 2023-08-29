import { CommandBus, IQuery, QueryBus } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { UserDTO } from "@fixtrack/contracts";
import { GetUsersQuery } from "../../application/query/get-users.query";
import { CreateUserCommand } from "../../application/command/create-user.command";

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  async getUsers() {
    return this.queryBus.execute<IQuery, Array<UserDTO>>(new GetUsersQuery());
  }

  async createUser(email: string, password: string, role: string) {
    return this.commandBus.execute(new CreateUserCommand(email, password, role));
  }

}
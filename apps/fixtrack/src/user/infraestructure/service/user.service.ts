import { CommandBus, IQuery, QueryBus } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { UserDTO } from "@fixtrack/contracts";
import { GetUsersQuery } from "../../application/query/get-users.query";

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }
  async getUsers() {
    return this.queryBus.execute<IQuery, Array<UserDTO>>(new GetUsersQuery());
  }
}
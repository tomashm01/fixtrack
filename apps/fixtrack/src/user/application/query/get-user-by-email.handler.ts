import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByEmailQuery } from "./get-user-by-email.query";
import { Inject } from "@nestjs/common";
import { USER_FINDER, UserFinder } from "../service/user-finder.service";
import { UserDTO } from "@fixtrack/contracts";
import { UserEmail } from "../../domain";

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(
    @Inject(USER_FINDER) private readonly userService:UserFinder
  ) {}

  async execute(query: GetUserByEmailQuery): Promise<UserDTO|null> {
    return await this.userService.findByEmail(UserEmail.with(query.email));
  }
}
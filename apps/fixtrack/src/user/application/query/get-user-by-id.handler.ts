import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from '@nestjs/common';

import { GetUserByIdQuery } from "./get-user-by-id.query";
import { UserDTO } from "@fixtrack/contracts";
import { USER_FINDER, UserFinder } from "../service/user-finder.service";
import { UserId } from "../../domain";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery>{
  constructor(@Inject(USER_FINDER) private readonly userFinder:UserFinder) {}

  async execute(query:GetUserByIdQuery): Promise<UserDTO|null> {
    return await this.userFinder.findById(UserId.with(query.id));
  }
}
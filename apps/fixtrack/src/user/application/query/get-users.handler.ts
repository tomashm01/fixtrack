import { UserDTO } from '@fixtrack/contracts';
import { Nullable } from '@fixtrack/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUsersQuery } from './get-users.query';
import { USER_FINDER, UserFinder } from '../service/user-finder.service';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(@Inject(USER_FINDER)
  private readonly userFinder: UserFinder) {}

  async execute(): Promise<Nullable<Array<UserDTO>>> {
    return this.userFinder.findAll();
  }
}

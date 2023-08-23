import { UserDTO } from '@fixtrack/contracts';
import { Nullable } from '@fixtrack/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserRepository, userRepository } from '../../domain';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(@Inject(userRepository) private users: UserRepository) {}

  async execute(): Promise<Nullable<Array<UserDTO>>> {
    const users = await this.users.findAll();

    return users.map(user => ({
      id: user.id.value,
      email: user.email.value,
      password: user.password.value,
      role: user.role.value,
    }));
  }
}

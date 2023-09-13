import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  AggregateRepository,
  InjectAggregateRepository
} from '@aulasoftwarelibre/nestjs-eventstore';

import {
  User,
  UserEmail,
  UserId,
  UserNotFoundError,
  UserPassword,
  UserRole
} from '../../domain';
import { USER_FINDER, UserFinder } from '../service/user-finder.service';
import { UserDTO } from '@fixtrack/contracts';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectAggregateRepository(User)
    private readonly users: AggregateRepository<User, UserId>,
    @Inject(USER_FINDER) private readonly userFinder: UserFinder
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const userId: UserId = UserId.with(command.id);

    const userDto: UserDTO = await this.userFinder.findById(userId);
    if (!userDto) throw UserNotFoundError.withId(userId);

    const user: User = await this.users.find(userId);
    user.delete();

    this.users.save(user);
  }
}

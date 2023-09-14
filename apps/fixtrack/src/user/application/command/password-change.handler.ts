import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AggregateRepository,
  InjectAggregateRepository
} from '@aulasoftwarelibre/nestjs-eventstore';

import { PasswordChangeCommand } from './password-change.command';
import {
  User,
  UserNotFoundError,
  UserPassword,
  UserId
} from '../../domain';


@CommandHandler(PasswordChangeCommand)
export class PasswordChangeHandler implements ICommandHandler<PasswordChangeCommand> {
  constructor(
    @InjectAggregateRepository(User)
    private readonly users: AggregateRepository<User, UserId>
  ) {}

  async execute(command: PasswordChangeCommand): Promise<void> {

    const userId: UserId = UserId.with(command.id);
    const newPassword : UserPassword = UserPassword.with(command.password);

    const user = await this.users.find(userId);
    if (!user) {
      throw UserNotFoundError.withId(userId);
    }
    
    user.updatePassword(newPassword);
    this.users.save(user);

  }
}

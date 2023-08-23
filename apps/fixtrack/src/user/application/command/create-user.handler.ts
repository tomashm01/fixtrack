import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  UserEmail,
  UserRole,
  User,
  UserId,
  UserRepository,
  userRepository,
  UserPassword
} from '../../domain';
import {
  UserIdNotFoundError,
  UserEmailAlreadyTakenError,
} from '../../domain/exception/';
import { CreateUserCommand } from './create-user.command';
import { UserIdAlreadyTakenError } from '../../domain/exception/user-id-exists';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(userRepository) private repository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand) {
    const id = UserId.generate();
    const password = UserPassword.fromString(command.password);
    const email = UserEmail.fromString(command.email);
    const role = UserRole.fromString(command.role);

    if (await this.repository.find(id)) {
      throw UserIdAlreadyTakenError.with(id);
    }

    if (await this.repository.findOneByEmail(email)) {
      throw UserEmailAlreadyTakenError.with(email);
    }

    const user = User.add(id, email, password, role);
    this.repository.save(user);
  }
}

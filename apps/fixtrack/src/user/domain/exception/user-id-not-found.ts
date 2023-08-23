import { NotFoundError } from '@fixtrack/domain';

import { UserId } from '../model';

export class UserIdNotFoundError extends NotFoundError {
  public static with(userId: UserId): UserIdNotFoundError {
    return new UserIdNotFoundError(`User id ${userId.value} not found`);
  }
}

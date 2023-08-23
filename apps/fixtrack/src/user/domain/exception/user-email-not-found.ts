import { UserEmail } from '../model';

export class UserEmailNotFoundError extends Error {
  public static with(email: UserEmail): UserEmailNotFoundError {
    return new UserEmailNotFoundError(`Email ${email.value} not found`);
  }
}

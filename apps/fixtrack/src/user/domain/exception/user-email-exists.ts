import { UserEmail } from '../model';

export class UserEmailAlreadyTakenError extends Error {
  public static with(email: UserEmail): UserEmailAlreadyTakenError {
    return new UserEmailAlreadyTakenError(
      `Email ${email.value} already taken`
    );
  }
}

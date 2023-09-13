import { UserEmail, UserId } from '../model';
import { UserError } from './user.error';

export class UserAlreadyExistsError extends UserError {
  public static withId(id: UserId): UserAlreadyExistsError {
    return new UserAlreadyExistsError(`USUARIO CON ID ${id.value} YA EXISTE`);
  }

  public static withEmail(mail: UserEmail): UserAlreadyExistsError {
    return new UserAlreadyExistsError(
      `USUARIO CON EMAIL ${mail.value} YA EXISTE`
    );
  }
}

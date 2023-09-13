import { UserId } from '../model';
import { UserError } from './user.error';

export class UserNotFoundError extends UserError {
  public static withId(id: UserId): UserNotFoundError {
    return new UserNotFoundError(`USUARIO CON ID ${id.value} NO ENCONTRADO`);
  }
}

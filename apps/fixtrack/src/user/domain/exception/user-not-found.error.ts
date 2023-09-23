import { NotFoundException } from '@nestjs/common';
import { UserId } from '../model';

export class UserNotFoundError extends NotFoundException {
  public static withId(id: UserId): UserNotFoundError {
    return new UserNotFoundError(`USUARIO CON ID ${id.value} NO ENCONTRADO`);
  }
}

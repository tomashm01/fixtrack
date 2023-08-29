import { UserId } from "../model";
import { UserError } from "./user.error";


export class UserNotFoundError extends UserError {
  public static withId(id: UserId): UserNotFoundError {
    return new UserNotFoundError(`User with id ${id.value} not found`);
  }
}

import { UserEmail, UserId } from "../model";
import { UserError } from "./user.error";

export class UserAlreadyExistsError extends UserError {
  public static withId(id: UserId): UserAlreadyExistsError {
    return new UserAlreadyExistsError(
      `User with id ${id.value} already exists`,
    );
  }

  public static withEmail(mail: UserEmail): UserAlreadyExistsError {
    return new UserAlreadyExistsError(
      `User with mail ${mail.value} already exists`,
    );
  }
}

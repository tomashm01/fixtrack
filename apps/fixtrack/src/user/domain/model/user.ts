import { EncryptedAggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';


import { UserWasCreated } from '../event';
import { UserId } from './user-id';
import { UserEmail } from './user-email';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';

export class User extends EncryptedAggregateRoot {
  private _userId: UserId;
  private _email: UserEmail;
  private _password: UserPassword;
  private _role: UserRole;


  public static add(
    userId: UserId,
    email: UserEmail,
    password: UserPassword,
    role: UserRole
  ): User {
    const user = new User();
    user.apply(
      new UserWasCreated(userId.value, email.value, password.value, role.value)
    );

    return user;
  }

  public aggregateId(): string {
    return this._userId.value;
  }

  get userId(): UserId {
    return this._userId;
  }

  get email(): UserEmail {
    return this._email;
  }

  get password(): UserPassword {
    return this._password;
  }

  get role(): UserRole {
    return this._role;
  }

  private onUserWasCreated(event: UserWasCreated) {
    this._userId = UserId.with(event.id);
    this._email = UserEmail.with(event.email);
    this._password = UserPassword.with(event.password);
    this._role = UserRole.with(event.role);
  }
}

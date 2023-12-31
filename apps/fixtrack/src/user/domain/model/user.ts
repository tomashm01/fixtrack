import { EncryptedAggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { PasswordWasChanged, UserWasCreated, UserWasDeleted } from '../event';
import { UserId } from './user-id';
import { UserEmail } from './user-email';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';

export class User extends EncryptedAggregateRoot {
  private _userId: UserId;
  private _email: UserEmail;
  private _password: UserPassword;
  private _role: UserRole;
  private _deleted: boolean = false;

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

  delete(): void {
    if (!this._deleted) this.apply(new UserWasDeleted(this._userId.value));
  }

  updatePassword(newPassword: UserPassword): void {
    if (!this._deleted && newPassword.value !== this._password.value) {
      this.apply(new PasswordWasChanged(this._userId.value, newPassword.value));
    }
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

  public get deleted(): boolean {
    return this._deleted;
  }

  private onUserWasCreated(event: UserWasCreated) {
    this._userId = UserId.with(event.id);
    this._email = UserEmail.with(event.email);
    this._password = UserPassword.with(event.password);
    this._role = UserRole.with(event.role);
  }

  private onUserWasDeleted(event: UserWasDeleted) {
    this._deleted = true;
  }

  private onPasswordWasChanged(event: PasswordWasChanged) {
    this._password = UserPassword.with(event.password);
  }
}

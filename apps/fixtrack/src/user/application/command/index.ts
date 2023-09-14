import { CreateUserCommand } from './create-user.command';
import { CreateUserHandler } from './create-user.handler';
import { DeleteUserCommand } from './delete-user.command';
import { DeleteUserHandler } from './delete-user.handler';
import { PasswordChangeCommand } from './password-change.command';
import { PasswordChangeHandler } from './password-change.handler';

export const CommandHandlers = [CreateUserHandler, DeleteUserHandler, PasswordChangeHandler];

export const Commands = [CreateUserCommand, DeleteUserCommand, PasswordChangeCommand];

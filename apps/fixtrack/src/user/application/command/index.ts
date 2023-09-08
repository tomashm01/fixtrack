import { CreateUserCommand } from "./create-user.command";
import { CreateUserHandler } from "./create-user.handler";
import { DeleteUserCommand } from "./delete-user.command";
import { DeleteUserHandler } from "./delete-user.handler";


export const CommandHandlers=[
  CreateUserHandler,
  DeleteUserHandler
];

export const Commands=[
  CreateUserCommand,
  DeleteUserCommand
];
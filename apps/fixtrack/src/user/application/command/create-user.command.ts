import { ICommand } from "@nestjs/cqrs";

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly email:string, 
    public readonly password:string,
    public readonly role:string,
  ) { }
}
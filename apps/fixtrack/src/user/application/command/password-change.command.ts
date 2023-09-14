import { ICommand } from '@nestjs/cqrs';

export class PasswordChangeCommand implements ICommand {
  constructor(public readonly id: string, public readonly password: string) {}
}

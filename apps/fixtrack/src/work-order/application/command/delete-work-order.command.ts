import { ICommand } from '@nestjs/cqrs';

export class DeleteWorkOrderCommand implements ICommand {
  constructor(public readonly id: string) {}
}

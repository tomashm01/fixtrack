import { ICommand } from '@nestjs/cqrs';

export class DeleteDeviceCommand implements ICommand {
  constructor(public readonly id: string) {}
}

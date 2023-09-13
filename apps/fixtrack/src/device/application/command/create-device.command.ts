import { ICommand } from '@nestjs/cqrs';

export class CreateDeviceCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly model: string,
    public readonly type: string,
    public readonly brand: string
  ) {}
}

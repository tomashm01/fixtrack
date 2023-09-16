import { ICommand } from '@nestjs/cqrs';

export class CreateWorkOrderCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly technicianId: string,
    public readonly deviceId: string,
    public readonly description: string,
    public readonly status: string,
    public readonly startDate: Date,
    public readonly price: number
  ) {}
}

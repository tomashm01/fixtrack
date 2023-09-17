import { ICommand } from '@nestjs/cqrs';

export class UpdateWorkOrderCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly idCustomer: string,
    public readonly idTechnician: string,
    public readonly idDevice: string,
    public readonly description: string,
    public readonly status: string,
    public readonly startDate: Date,
    public readonly price: number,
    public readonly endDate?: Date
  ) {}
}

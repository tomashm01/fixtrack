import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import { WorkOrderDTO } from '@fixtrack/contracts';

export class WorkOrderWasUpdated extends Event<WorkOrderDTO> {
  constructor(
    public readonly id: string,
    public readonly idTechnician: string,
    public readonly idCustomer: string,
    public readonly idDevice: string,
    public readonly startDate: Date,
    public readonly status: string,
    public readonly description: string,
    public readonly price: number,
    public readonly endDate?: Date
  ) {
    super(id, {
      _id: id,
      idTechnician,
      idCustomer,
      idDevice,
      status,
      startDate,
      description,
      price,
      endDate
    });
  }
}

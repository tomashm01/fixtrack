import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class WorkOrderIdTechnician extends Id {
  public static with(id: string): WorkOrderIdTechnician {
    return new WorkOrderIdTechnician(id);
  }

  get value(): string {
    return this.props.value;
  }
}

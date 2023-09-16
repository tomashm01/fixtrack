import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class WorkOrderId extends Id {
  public static with(id: string): WorkOrderId {
    return new WorkOrderId(id);
  }

  get value(): string {
    return this.props.value;
  }
}

import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class WorkOrderIdDevice extends Id {
  public static with(id: string): WorkOrderIdDevice {
    return new WorkOrderIdDevice(id);
  }

  get value(): string {
    return this.props.value;
  }
}

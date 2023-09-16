import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class WorkOrderIdCustomer extends Id {
  public static with(id: string): WorkOrderIdCustomer {
    return new WorkOrderIdCustomer(id);
  }

  get value(): string {
    return this.props.value;
  }
}

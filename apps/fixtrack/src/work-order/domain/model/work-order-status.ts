import { ValueObject } from '@fixtrack/domain';
import { Status } from '@fixtrack/contracts';

interface Props {
  value: Status;
}

export class WorkOrderStatus extends ValueObject<Props> {
  public static with(status: string): WorkOrderStatus {
    if (status.length === 0) {
      throw new Error('ROL NO PUEDE ESTAR VACÍO');
    }

    status = status.toUpperCase();

    if (!Object.values(Status).includes(status as Status)) {
      throw new Error(
        `STATUS INVÁLIDO ${status}. STATUS PERMITIDOS: ${Object.values(
          Status
        ).join(', ')}`
      );
    }

    return new WorkOrderStatus({ value: status as Status });
  }

  get value(): string {
    return this.props.value;
  }
}

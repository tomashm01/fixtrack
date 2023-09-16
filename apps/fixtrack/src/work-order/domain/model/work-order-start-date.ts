import { ValueObject } from '@fixtrack/domain';

interface Props {
  value: string;
}

export class WorkOrderStartDate extends ValueObject<Props> {
  public static with(date: Date): WorkOrderStartDate {
    if (date.toString() === '') {
      throw new Error('Invalid time value');
    }

    if (date > new Date()) {
      throw new Error('Start date cannot be in the future');
    }

    return new WorkOrderStartDate({ value: date.toISOString().split('T')[0] });
  }

  get value(): string {
    return this.props.value.toString();
  }
}

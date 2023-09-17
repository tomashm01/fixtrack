import { ValueObject } from '@fixtrack/domain';

interface Props {
  value: Date;
}

export class WorkOrderStartDate extends ValueObject<Props> {
  public static with(date: Date): WorkOrderStartDate {
    if (date === null) {
      throw new Error('Invalid time value');
    }

    if (date > new Date()) {
      throw new Error('Start date cannot be in the future');
    }

    return new WorkOrderStartDate({ value: date });
  }

  get value(): Date {
    return this.props.value;
  }
}

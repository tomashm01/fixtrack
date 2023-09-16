import { ValueObject } from '@fixtrack/domain';

interface Props {
  value: Date;
}

export class WorkOrderEndDate extends ValueObject<Props> {
  public static with(date: Date): WorkOrderEndDate {
    if (date.toString() === '') {
      throw new Error('Invalid time value');
    }

    if (date > new Date()) {
      throw new Error('End date cannot be in the future');
    }

    return new WorkOrderEndDate({ value: date });
  }

  get value(): Date {
    return this.props.value;
  }
}

import { ValueObject } from '@fixtrack/domain';

interface Props {
  value: Date | null;
}

export class WorkOrderEndDate extends ValueObject<Props> {
  public static with(date: Date | null): WorkOrderEndDate {
    if (date === null || date === undefined) {
      return new WorkOrderEndDate({ value: null });
    }

    if (date > new Date()) {
      throw new Error('End date cannot be in the future');
    }

    return new WorkOrderEndDate({ value: date });
  }

  get value(): Date | null {
    return this.props.value;
  }
}

import { ValueObject } from '@fixtrack/domain';

interface Props {
  value: string;
}

export class WorkOrderDescription extends ValueObject<Props> {
  public static with(description: string): WorkOrderDescription {
    if (description.length < 1) {
      throw new Error('Description cannot be empty');
    }

    return new WorkOrderDescription({ value: description });
  }

  get value(): string {
    return this.props.value;
  }
}

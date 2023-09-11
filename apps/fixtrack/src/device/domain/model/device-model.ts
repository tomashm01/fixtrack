import { ValueObject } from '@fixtrack/domain';

interface Props {
  value: string;
}

export class DeviceModel extends ValueObject<Props> {
  public static with(name: string): DeviceModel {
    if (name.length===0) {
      throw new Error('Model name cannot be empty');
    }

    return new DeviceModel({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}

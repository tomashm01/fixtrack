import { ValueObject } from '@fixtrack/domain';

interface Props {
  value: string;
}

export class DeviceModel extends ValueObject<Props> {
  public static with(name: string): DeviceModel {
    if (name.length===0) {
      throw new Error('MODELO NO PUEDE ESTAR VACÍO');
    }

    return new DeviceModel({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}

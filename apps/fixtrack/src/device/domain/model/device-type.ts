import { ValueObject } from '@fixtrack/domain';
import {Type} from '@fixtrack/contracts';

interface Props {
  value: Type;
}

export class DeviceType extends ValueObject<Props> {
  public static with(name: string): DeviceType {
    if (name.length === 0) {
      throw new Error('Type cannot be empty');
    }

    name = name.toUpperCase();

    if (!Object.values(Type).includes(name as Type)) {
        throw new Error(`Invalid type: ${name}. Allowed types are: ${Object.values(Type).join(', ')}`);
    }

    return new DeviceType({ value: name as Type });
  }

  get value(): string {
    return this.props.value;
  }
}

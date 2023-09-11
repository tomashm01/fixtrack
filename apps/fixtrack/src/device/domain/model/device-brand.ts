import { ValueObject } from '@fixtrack/domain';
import {Brand} from '@fixtrack/contracts';

interface Props {
  value: Brand;
}

export class DeviceBrand extends ValueObject<Props> {
  public static with(name: string): DeviceBrand {
    if (name.length === 0) {
      throw new Error('Brand cannot be empty');
    }

    name = name.toUpperCase();

    if (!Object.values(Brand).includes(name as Brand)) {
        throw new Error(`Invalid brand: ${name}. Allowed brands are: ${Object.values(Brand).join(', ')}`);
    }

    return new DeviceBrand({ value: name as Brand });
  }

  get value(): string {
    return this.props.value;
  }
}

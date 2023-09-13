import { ValueObject } from '@fixtrack/domain';
import {Brand} from '@fixtrack/contracts';

interface Props {
  value: Brand;
}

export class DeviceBrand extends ValueObject<Props> {
  public static with(name: string): DeviceBrand {
    if (name.length === 0) {
      throw new Error('MARCA NO PUEDE ESTAR VACÍA');
    }

    name = name.toUpperCase();

    if (!Object.values(Brand).includes(name as Brand)) {
        throw new Error(`MARCA INVÁLIDA: ${name}. MARCAS VALIDAS: ${Object.values(Brand).join(', ')}`);
    }

    return new DeviceBrand({ value: name as Brand });
  }

  get value(): string {
    return this.props.value;
  }
}

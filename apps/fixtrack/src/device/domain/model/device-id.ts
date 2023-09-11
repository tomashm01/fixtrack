import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class DeviceId extends Id {

  public static with(id: string): DeviceId {
    return new DeviceId(id);
  }

  get value(): string {
    return this.props.value;
  }
}

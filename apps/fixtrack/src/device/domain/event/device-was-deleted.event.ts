import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class DeviceWasDeleted extends Event {
  constructor(
    public readonly id: string,
  ) {
    super(id, {
      _id: id,
    });
  }
}
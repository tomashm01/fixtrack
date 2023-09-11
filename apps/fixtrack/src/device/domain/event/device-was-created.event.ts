import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import { DeviceDTO } from '@fixtrack/contracts';

export class DeviceWasCreated extends Event<DeviceDTO> {
  constructor(
    public readonly id: string,
    public readonly model: string,
    public readonly type: string,
    public readonly brand: string
  ) {
    super(id, { id, model, type, brand });
  }
}
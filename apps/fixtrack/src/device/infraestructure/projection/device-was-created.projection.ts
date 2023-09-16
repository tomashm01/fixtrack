import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { DeviceWasCreated } from '../../domain';
import { DEVICE_PROJECTION, DeviceDocument } from './device.schema';

@EventsHandler(DeviceWasCreated)
export class DeviceWasCreatedProjection
  implements IEventHandler<DeviceWasCreated>
{
  constructor(
    @InjectModel(DEVICE_PROJECTION)
    private readonly deviceProjection: Model<DeviceDocument>
  ) {}

  async handle(event: DeviceWasCreated): Promise<void> {
    const device = new this.deviceProjection({
      ...event.payload
    });
    await device.save();
  }
}

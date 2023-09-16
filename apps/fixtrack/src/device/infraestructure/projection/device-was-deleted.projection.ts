import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { DeviceWasDeleted } from '../../domain';
import { DEVICE_PROJECTION, DeviceDocument } from './device.schema';

@EventsHandler(DeviceWasDeleted)
export class DeviceWasDeletedProjection
  implements IEventHandler<DeviceWasDeleted>
{
  constructor(
    @InjectModel(DEVICE_PROJECTION)
    private readonly deviceProjection: Model<DeviceDocument>
  ) {}

  async handle(event: DeviceWasDeleted): Promise<void> {
    const deviceView = await this.deviceProjection.findById(event.id).exec();
    await deviceView.deleteOne({ _id: event.id });
  }
}

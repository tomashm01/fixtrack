import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeviceDTO } from '@fixtrack/contracts';
import { Device, DeviceWasCreated, DeviceWasDeleted } from '../domain';
import { QueryHandlers } from '../application/query';
import { CommandHandlers } from '../application/command';
import { DeviceProviders } from '../device.provider';
import { DeviceController } from './controller/device.controller';
import {
  DEVICE_PROJECTION,
  DeviceSchema,
  ProjectionHandlers
} from './projection';
import { DeviceMongoFinderService } from './service';
import { DEVICE_FINDER } from '../application/service/device-finder.service';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: DEVICE_PROJECTION,
        schema: DeviceSchema
      }
    ]),
    EventStoreModule.forFeature([Device], {
      DeviceWasCreated: (event: Event<DeviceDTO>) =>
        new DeviceWasCreated(
          event.payload._id,
          event.payload.model,
          event.payload.type,
          event.payload.brand
        ),
      DeviceWasDeleted: (event: Event<DeviceDTO>) =>
        new DeviceWasDeleted(event.payload._id)
    })
  ],
  controllers: [DeviceController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    ...DeviceProviders,
    ...ProjectionHandlers,
    DeviceMongoFinderService
  ],
  exports: [DeviceMongoFinderService, DEVICE_FINDER]
})
export class DeviceModule {}

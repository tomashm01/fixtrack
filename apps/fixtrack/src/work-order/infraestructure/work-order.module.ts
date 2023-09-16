import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateWorkOrderDTO } from '@fixtrack/contracts';
import { QueryHandlers } from '../application/query';
import { CommandHandlers } from '../application/command';
import { WorkOrder, WorkOrderWasCreated } from '../domain';
import { WorkOrderController } from './controller/work-order.controller';
import { WorkOrderProviders } from '../work-order.provider';
import { WorkOrderMongoFinderService } from './service/workOrderMongoFinder.service';
import {
  ProjectionHandlers,
  WORK_ORDER_PROJECTION,
  WorkOrderSchema
} from './projection';
import { UserModule } from '../../user';
import { AuthModule } from '../../auth/auth.module';
import { DeviceModule } from '../../device';

@Module({
  imports: [
    CqrsModule,
    UserModule,
    DeviceModule,
    MongooseModule.forFeature([
      {
        name: WORK_ORDER_PROJECTION,
        schema: WorkOrderSchema
      }
    ]),
    EventStoreModule.forFeature([WorkOrder], {
      WorkOrderWasCreated: (event: Event<CreateWorkOrderDTO>) =>
        new WorkOrderWasCreated(
          event.payload._id,
          event.payload.idTechnician,
          event.payload.idCustomer,
          event.payload.idDevice,
          event.payload.startDate,
          event.payload.status,
          event.payload.description,
          event.payload.price
        )
    })
  ],
  controllers: [WorkOrderController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    ...WorkOrderProviders,
    ...ProjectionHandlers,
    WorkOrderMongoFinderService
  ],
  exports: [WorkOrderMongoFinderService]
})
export class WorkOrderModule {}

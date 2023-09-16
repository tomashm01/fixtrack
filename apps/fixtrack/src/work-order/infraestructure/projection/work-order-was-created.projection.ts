import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WorkOrderWasCreated } from '../../domain';
import { WORK_ORDER_PROJECTION, WorkOrderDocument } from './work-order.schema';

@EventsHandler(WorkOrderWasCreated)
export class WorkOrderWasCreatedProjection
  implements IEventHandler<WorkOrderWasCreated>
{
  constructor(
    @InjectModel(WORK_ORDER_PROJECTION)
    private readonly workOrderProjection: Model<WorkOrderDocument>
  ) {}

  async handle(event: WorkOrderWasCreated): Promise<void> {
    const workOrder = new this.workOrderProjection({
      ...event.payload
    });
    await workOrder.save();
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import { WORK_ORDER_PROJECTION, WorkOrderDocument } from './work-order.schema';
import { WorkOrderWasUpdated } from '../../domain';
import { InjectModel } from '@nestjs/mongoose';

@EventsHandler(WorkOrderWasUpdated)
export class WorkOrderWasUpdatedProjection
  implements IEventHandler<WorkOrderWasUpdated>
{
  constructor(
    @InjectModel(WORK_ORDER_PROJECTION)
    private readonly workOrderProjection: Model<WorkOrderDocument>
  ) {}

  async handle(event: WorkOrderWasUpdated): Promise<void> {
    const workOrderView = await this.workOrderProjection
      .findById(event.id)
      .exec();
    await workOrderView.updateOne({ $set: event });
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WorkOrderWasDeleted } from '../../domain';
import { WORK_ORDER_PROJECTION, WorkOrderDocument } from './work-order.schema';

@EventsHandler(WorkOrderWasDeleted)
export class WorkOrderWasDeletedProjection
  implements IEventHandler<WorkOrderWasDeleted>
{
  constructor(
    @InjectModel(WORK_ORDER_PROJECTION)
    private readonly workOrderProjection: Model<WorkOrderDocument>
  ) {}

  async handle(event: WorkOrderWasDeleted): Promise<void> {
    const workOrderView = await this.workOrderProjection
      .findById(event.id)
      .exec();
    await workOrderView.deleteOne({ _id: event.id });
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  AggregateRepository,
  InjectAggregateRepository
} from '@aulasoftwarelibre/nestjs-eventstore';

import { WorkOrder, WorkOrderId, WorkOrderNotFound } from '../../domain';
import { WorkOrderDTO } from '@fixtrack/contracts';
import { DeleteWorkOrderCommand } from './delete-work-order.command';
import {
  WORK_ORDER_FINDER,
  WorkOrderFinder
} from '../service/work-order-finder.service';

@CommandHandler(DeleteWorkOrderCommand)
export class DeleteWorkOrderHandler
  implements ICommandHandler<DeleteWorkOrderCommand>
{
  constructor(
    @InjectAggregateRepository(WorkOrder)
    private readonly workorders: AggregateRepository<WorkOrder, WorkOrderId>,
    @Inject(WORK_ORDER_FINDER)
    private readonly workOrderFinder: WorkOrderFinder
  ) {}

  async execute(command: DeleteWorkOrderCommand): Promise<void> {
    const workOrderId: WorkOrderId = WorkOrderId.with(command.id);

    const workOrderDto: WorkOrderDTO = await this.workOrderFinder.findById(
      workOrderId
    );
    if (!workOrderDto) throw WorkOrderNotFound.withId(workOrderId);

    const workOrder: WorkOrder = await this.workorders.find(workOrderId);

    workOrder.delete();
    this.workorders.save(workOrder);
  }
}

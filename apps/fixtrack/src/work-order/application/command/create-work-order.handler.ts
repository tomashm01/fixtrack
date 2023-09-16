import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  AggregateRepository,
  InjectAggregateRepository
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateWorkOrderCommand } from './create-work-order.command';
import {
  WorkOrder,
  WorkOrderAlreadyExistsError,
  WorkOrderDescription,
  WorkOrderId,
  WorkOrderIdCustomer,
  WorkOrderIdDevice,
  WorkOrderIdTechnician,
  WorkOrderPrice,
  WorkOrderStartDate,
  WorkOrderStatus
} from '../../domain';
import {
  WORK_ORDER_FINDER,
  WorkOrderFinder
} from '../service/work-order-finder.service';

@CommandHandler(CreateWorkOrderCommand)
export class CreateWorkOrderHandler
  implements ICommandHandler<CreateWorkOrderCommand>
{
  constructor(
    @InjectAggregateRepository(WorkOrder)
    private readonly workOrders: AggregateRepository<WorkOrder, WorkOrderId>,
    @Inject(WORK_ORDER_FINDER) private readonly workOrderFinder: WorkOrderFinder
  ) {}

  async execute(command: CreateWorkOrderCommand): Promise<WorkOrder> {
    const workOrderId: WorkOrderId = WorkOrderId.with(command.id);
    const userId: WorkOrderIdCustomer = WorkOrderIdCustomer.with(
      command.userId
    );
    const technicianId: WorkOrderIdTechnician = WorkOrderIdTechnician.with(
      command.technicianId
    );
    const deviceId: WorkOrderIdDevice = WorkOrderIdDevice.with(
      command.deviceId
    );
    const description: WorkOrderDescription = WorkOrderDescription.with(
      command.description
    );
    const status: WorkOrderStatus = WorkOrderStatus.with(command.status);
    const startDate: WorkOrderStartDate = WorkOrderStartDate.with(
      command.startDate
    );
    const price: WorkOrderPrice = WorkOrderPrice.with(command.price);

    if ((await this.workOrderFinder.findById(workOrderId)) != null)
      throw WorkOrderAlreadyExistsError.withId(workOrderId);

    const workOrder: WorkOrder = WorkOrder.add(
      workOrderId,
      userId,
      technicianId,
      deviceId,
      description,
      status,
      startDate,
      price
    );

    await this.workOrders.save(workOrder);
    return workOrder;
  }
}

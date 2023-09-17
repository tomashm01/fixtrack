import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  AggregateRepository,
  InjectAggregateRepository
} from '@aulasoftwarelibre/nestjs-eventstore';

import {
  WorkOrder,
  WorkOrderDescription,
  WorkOrderEndDate,
  WorkOrderId,
  WorkOrderIdCustomer,
  WorkOrderIdDevice,
  WorkOrderIdTechnician,
  WorkOrderNotFound,
  WorkOrderPrice,
  WorkOrderStartDate,
  WorkOrderStatus
} from '../../domain';
import {
  WORK_ORDER_FINDER,
  WorkOrderFinder
} from '../service/work-order-finder.service';
import {
  DEVICE_FINDER,
  DeviceFinder
} from 'apps/fixtrack/src/device/application/service/device-finder.service';
import { USER_FINDER } from 'apps/fixtrack/src/user/application/service/user-finder.service';
import { UserFinderService } from 'apps/fixtrack/src/user/infraestructure/service';
import { DeviceNotFoundError } from 'apps/fixtrack/src/device/domain';
import { UserNotFoundError } from 'apps/fixtrack/src/user/domain';
import { UpdateWorkOrderCommand } from './update-work-order.command';

@CommandHandler(UpdateWorkOrderCommand)
export class UpdateWorkOrderHandler
  implements ICommandHandler<UpdateWorkOrderCommand>
{
  constructor(
    @InjectAggregateRepository(WorkOrder)
    private readonly workOrders: AggregateRepository<WorkOrder, WorkOrderId>,
    @Inject(WORK_ORDER_FINDER)
    private readonly workOrderFinder: WorkOrderFinder,
    @Inject(DEVICE_FINDER) private readonly deviceFinder: DeviceFinder,
    @Inject(USER_FINDER) private readonly userFinder: UserFinderService
  ) {}

  async execute(command: UpdateWorkOrderCommand): Promise<void> {
    const workOrderId: WorkOrderId = WorkOrderId.with(command.id);
    const userId: WorkOrderIdCustomer = WorkOrderIdCustomer.with(
      command.idCustomer
    );
    const technicianId: WorkOrderIdTechnician = WorkOrderIdTechnician.with(
      command.idTechnician
    );
    const deviceId: WorkOrderIdDevice = WorkOrderIdDevice.with(
      command.idDevice
    );
    const description: WorkOrderDescription = WorkOrderDescription.with(
      command.description
    );
    const status: WorkOrderStatus = WorkOrderStatus.with(command.status);
    const startDate: WorkOrderStartDate = WorkOrderStartDate.with(
      command.startDate
    );
    const price: WorkOrderPrice = WorkOrderPrice.with(command.price);
    const endDate: WorkOrderEndDate = WorkOrderEndDate.with(command.endDate);

    if ((await this.workOrderFinder.findById(workOrderId)) == null)
      throw WorkOrderNotFound.withId(workOrderId);

    if ((await this.deviceFinder.findById(deviceId)) == null)
      throw DeviceNotFoundError.withId(deviceId);

    if ((await this.userFinder.findById(userId)) == null)
      throw UserNotFoundError.withId(userId);

    if ((await this.userFinder.findById(technicianId)) == null)
      throw UserNotFoundError.withId(technicianId);

    const workOrder = await this.workOrders.find(workOrderId);
    if (!workOrder) {
      throw WorkOrderNotFound.withId(workOrderId);
    }

    workOrder.update(
      workOrderId,
      technicianId,
      userId,
      deviceId,
      startDate,
      status,
      description,
      price,
      endDate
    );
    this.workOrders.save(workOrder);
  }
}

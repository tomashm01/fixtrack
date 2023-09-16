import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Nullable } from '@fixtrack/domain';
import { WorkOrderDTO } from '@fixtrack/contracts';
import { GetWorkOrdersQuery } from './get-work-orders.query';
import {
  WORK_ORDER_FINDER,
  WorkOrderFinder
} from '../service/work-order-finder.service';

@QueryHandler(GetWorkOrdersQuery)
export class GetWorkOrdersHandler implements IQueryHandler<GetWorkOrdersQuery> {
  constructor(
    @Inject(WORK_ORDER_FINDER)
    private readonly workOrderFinder: WorkOrderFinder
  ) {}

  async execute(): Promise<Nullable<WorkOrderDTO[]>> {
    return this.workOrderFinder.findAll();
  }
}

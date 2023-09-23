import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { KnownRoles, WorkOrderDTO } from '@fixtrack/contracts';
import { GetWorkOrdersByUserIdQuery } from './get-work-orders-by-userId.query';
import {
  WORK_ORDER_FINDER,
  WorkOrderFinder
} from '../service/work-order-finder.service';
import { UserId, UserNotFoundError } from 'apps/fixtrack/src/user/domain';
import {
  USER_FINDER,
  UserFinder
} from 'apps/fixtrack/src/user/application/service/user-finder.service';
import { WorkOrderIdCustomer } from '../../domain';

@QueryHandler(GetWorkOrdersByUserIdQuery)
export class GetWorkOrdersByUserIdHandler
  implements IQueryHandler<GetWorkOrdersByUserIdQuery>
{
  constructor(
    @Inject(WORK_ORDER_FINDER)
    private readonly workOrderFinder: WorkOrderFinder,
    @Inject(USER_FINDER)
    private readonly userFinder: UserFinder
  ) {}

  async execute(query: GetWorkOrdersByUserIdQuery): Promise<WorkOrderDTO[]> {
    const userId = UserId.with(query.userId);

    const user = await this.userFinder.findById(userId);
    if (user === null || user.role !== KnownRoles.CLIENTE)
      throw UserNotFoundError.withId(userId);

    return await this.workOrderFinder.findByUserId(
      WorkOrderIdCustomer.with(query.userId)
    );
  }
}

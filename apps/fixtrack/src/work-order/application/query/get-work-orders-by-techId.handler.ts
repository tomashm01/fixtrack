import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { KnownRoles, WorkOrderDTO } from '@fixtrack/contracts';
import {
  WORK_ORDER_FINDER,
  WorkOrderFinder
} from '../service/work-order-finder.service';
import { UserId, UserNotFoundError } from 'apps/fixtrack/src/user/domain';
import {
  USER_FINDER,
  UserFinder
} from 'apps/fixtrack/src/user/application/service/user-finder.service';
import { GetWorkOrdersByTechIdQuery } from './get-work-orders-by-techId.query';
import { WorkOrderIdTechnician } from '../../domain';

@QueryHandler(GetWorkOrdersByTechIdQuery)
export class GetWorkOrdersByTechIdHandler
  implements IQueryHandler<GetWorkOrdersByTechIdQuery>
{
  constructor(
    @Inject(WORK_ORDER_FINDER)
    private readonly workOrderFinder: WorkOrderFinder,
    @Inject(USER_FINDER)
    private readonly userFinder: UserFinder
  ) {}

  async execute(query: GetWorkOrdersByTechIdQuery): Promise<WorkOrderDTO[]> {
    const techId = UserId.with(query.techId);

    const user = await this.userFinder.findById(techId);
    if (user === null || user.role !== KnownRoles.TECNICO)
      throw UserNotFoundError.withId(techId);

    return await this.workOrderFinder.findByTechnicianId(
      WorkOrderIdTechnician.with(query.techId)
    );
  }
}

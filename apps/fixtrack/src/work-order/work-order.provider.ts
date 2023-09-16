import { WORK_ORDER_FINDER } from './application/service/work-order-finder.service';
import { WorkOrderMongoFinderService } from './infraestructure/service';

export const WorkOrderProviders = [
  {
    provide: WORK_ORDER_FINDER,
    useClass: WorkOrderMongoFinderService
  }
];

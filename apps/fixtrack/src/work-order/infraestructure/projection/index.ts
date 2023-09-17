import { WorkOrderWasCreatedProjection } from './work-order-was-created.projection';
import { WorkOrderWasDeletedProjection } from './work-order-was-deleted.projection';
import { WorkOrderWasUpdatedProjection } from './work-order-was-updated.projection';

export * from './work-order.schema';

export const ProjectionHandlers = [
  WorkOrderWasCreatedProjection,
  WorkOrderWasDeletedProjection,
  WorkOrderWasUpdatedProjection
];

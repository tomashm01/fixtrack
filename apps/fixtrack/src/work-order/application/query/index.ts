import { GetWorkOrdersByTechIdHandler } from './get-work-orders-by-techId.handler';
import { GetWorkOrdersByTechIdQuery } from './get-work-orders-by-techId.query';
import { GetWorkOrdersByUserIdHandler } from './get-work-orders-by-userId.handler';
import { GetWorkOrdersByUserIdQuery } from './get-work-orders-by-userId.query';
import { GetWorkOrdersHandler } from './get-work-orders.handler';
import { GetWorkOrdersQuery } from './get-work-orders.query';

export const QueryHandlers = [
  GetWorkOrdersHandler,
  GetWorkOrdersByUserIdHandler,
  GetWorkOrdersByTechIdHandler
];

export const Queries = [
  GetWorkOrdersQuery,
  GetWorkOrdersByUserIdQuery,
  GetWorkOrdersByTechIdQuery
];

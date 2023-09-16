import { CreateWorkOrderCommand } from './create-work-order.command';
import { CreateWorkOrderHandler } from './create-work-order.handler';

export const CommandHandlers = [CreateWorkOrderHandler];

export const Commands = [CreateWorkOrderCommand];

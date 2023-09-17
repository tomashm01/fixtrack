import { CreateWorkOrderCommand } from './create-work-order.command';
import { CreateWorkOrderHandler } from './create-work-order.handler';
import { DeleteWorkOrderCommand } from './delete-work-order.command';
import { DeleteWorkOrderHandler } from './delete-work-order.handler';
import { UpdateWorkOrderCommand } from './update-work-order.command';
import { UpdateWorkOrderHandler } from './update-work-order.handler';

export const CommandHandlers = [
  CreateWorkOrderHandler,
  UpdateWorkOrderHandler,
  DeleteWorkOrderHandler
];

export const Commands = [
  CreateWorkOrderCommand,
  UpdateWorkOrderCommand,
  DeleteWorkOrderCommand
];

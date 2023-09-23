import { IQuery } from '@nestjs/cqrs';

export class GetWorkOrdersByUserIdQuery implements IQuery {
  constructor(public readonly userId: string) {}
}

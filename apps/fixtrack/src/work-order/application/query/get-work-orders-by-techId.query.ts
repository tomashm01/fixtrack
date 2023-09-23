import { IQuery } from '@nestjs/cqrs';

export class GetWorkOrdersByTechIdQuery implements IQuery {
  constructor(public readonly techId: string) {}
}

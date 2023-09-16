import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class WorkOrderWasDeleted extends Event {
  constructor(public readonly id: string) {
    super(id, {
      _id: id
    });
  }
}

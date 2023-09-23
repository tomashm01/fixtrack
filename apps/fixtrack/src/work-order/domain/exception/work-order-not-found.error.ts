import { NotFoundException } from '@nestjs/common';
import { WorkOrderId } from '../model';
import { WorkOrderError } from './work-order.error';

export class WorkOrderNotFound extends NotFoundException {
  public static withId(id: WorkOrderId): WorkOrderNotFound {
    return new WorkOrderNotFound(`WORKORDER CON ID ${id.value} NO ENCONTRADO`);
  }

  public static withIdAndUserId(
    id: WorkOrderId,
    userId: string
  ): WorkOrderNotFound {
    return new WorkOrderNotFound(
      `WORKORDER CON ID ${id.value} Y USUARIO ${userId} NO ENCONTRADO`
    );
  }

  public static withIdAndTechnicianId(
    id: WorkOrderId,
    technicianId: string
  ): WorkOrderNotFound {
    return new WorkOrderNotFound(
      `WORKORDER CON ID ${id.value} Y TECNICO ${technicianId} NO ENCONTRADO`
    );
  }
}

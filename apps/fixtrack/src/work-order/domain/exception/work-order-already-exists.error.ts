import { WorkOrderId } from '../model';
import { WorkOrderError } from './work-order.error';

export class WorkOrderAlreadyExistsError extends WorkOrderError {
  public static withId(id: WorkOrderId): WorkOrderAlreadyExistsError {
    return new WorkOrderAlreadyExistsError(
      `WORKORDER CON ID ${id.value} YA EXISTE`
    );
  }
}

import { WorkOrderDTO } from '@fixtrack/contracts';
import {
  WorkOrderId,
  WorkOrderIdCustomer,
  WorkOrderIdTechnician
} from '../../domain';

export const WORK_ORDER_FINDER = 'WORK_ORDER_FINDER';

export interface WorkOrderFinder {
  findAll(): Promise<WorkOrderDTO[]>;
  findById(id: WorkOrderId): Promise<WorkOrderDTO | null>;
  findByUserId(userId: WorkOrderIdCustomer): Promise<WorkOrderDTO[]>;
  findByTechnicianId(
    technicianId: WorkOrderIdTechnician
  ): Promise<WorkOrderDTO[]>;
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WorkOrderFinder } from '../../application/service/work-order-finder.service';
import { WORK_ORDER_PROJECTION, WorkOrderDocument } from '../projection';
import { WorkOrderDTO } from '@fixtrack/contracts';
import {
  WorkOrderId,
  WorkOrderIdCustomer,
  WorkOrderIdDevice,
  WorkOrderIdTechnician
} from '../../domain';

@Injectable()
export class WorkOrderMongoFinderService implements WorkOrderFinder {
  constructor(
    @InjectModel(WORK_ORDER_PROJECTION)
    private readonly workOrderModel: Model<WorkOrderDocument>
  ) {}

  async findAll(): Promise<WorkOrderDTO[]> {
    return this.workOrderModel.find().exec();
  }

  async findById(id: WorkOrderId): Promise<WorkOrderDTO | null> {
    return this.workOrderModel.findById({ _id: id.value }).exec();
  }

  async findByUserId(userId: WorkOrderIdCustomer): Promise<WorkOrderDTO[]> {
    return this.workOrderModel.find({ idCustomer: userId }).exec();
  }

  async findByTechnicianId(
    technicianId: WorkOrderIdTechnician
  ): Promise<WorkOrderDTO[]> {
    return this.workOrderModel.find({ idTechnician: technicianId }).exec();
  }

  async findByDeviceId(deviceId: WorkOrderIdDevice): Promise<WorkOrderDTO[]> {
    return this.workOrderModel.find({ idDevice: deviceId }).exec();
  }
}

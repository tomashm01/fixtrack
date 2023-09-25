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
    return await this.workOrderModel.find().exec();
  }

  async findById(id: WorkOrderId): Promise<WorkOrderDTO | null> {
    return await this.workOrderModel.findById({ _id: id.value }).exec();
  }

  async findByUserId(userId: WorkOrderIdCustomer): Promise<WorkOrderDTO[]> {
    return await this.workOrderModel
      .find({ idCustomer: userId.value })
      .sort({ startDate: -1 })
      .exec();
  }

  async findByTechnicianId(
    technicianId: WorkOrderIdTechnician
  ): Promise<WorkOrderDTO[]> {
    return await this.workOrderModel
      .find({
        idTechnician: technicianId.value,
        $or: [{ endDate: { $exists: false } }, { endDate: null }]
      })
      .sort({ startDate: 1 })
      .exec();
  }
}

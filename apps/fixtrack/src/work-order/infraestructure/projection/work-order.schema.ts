import { WorkOrderDTO } from '@fixtrack/contracts';
import { Document, Schema } from 'mongoose';

export const WORK_ORDER_PROJECTION = 'work-orders';

export type WorkOrderDocument = WorkOrderDTO & Document;

export const WorkOrderSchema = new Schema(
  {
    _id: String,
    idCustomer: String,
    idTechnician: String,
    idDevice: String,
    startDate: Date,
    endDate: {
      type: Date,
      required: false
    },
    description: String,
    status: String,
    price: Number
  },
  {
    versionKey: false
  }
);

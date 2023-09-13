import { DeviceDTO } from '@fixtrack/contracts';
import { Document, Schema } from 'mongoose';

export const DEVICE_PROJECTION = 'devices';

export type DeviceDocument = DeviceDTO & Document;

export const DeviceSchema = new Schema(
  {
    _id: String,
    model: { type: String, index: { unique: true } },
    type: String,
    brand: String
  },
  {
    versionKey: false
  }
);

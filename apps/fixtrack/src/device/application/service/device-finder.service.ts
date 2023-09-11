import { DeviceDTO } from '@fixtrack/contracts';
import { DeviceBrand, DeviceId, DeviceModel, DeviceType } from '../../domain';

export const DEVICE_FINDER = 'DEVICE_FINDER';

export interface DeviceFinder {
  findAll(): Promise<DeviceDTO[]>;
  findById(id: DeviceId): Promise<DeviceDTO | null>;
  findByModel(model: DeviceModel): Promise<DeviceDTO | null>;
}

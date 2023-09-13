import { DeviceId } from '../model';
import { DeviceError } from './device.error';

export class DeviceNotFoundError extends DeviceError {
  public static withId(id: DeviceId): DeviceNotFoundError {
    return new DeviceNotFoundError(`Device with id ${id.value} not found`);
  }
}

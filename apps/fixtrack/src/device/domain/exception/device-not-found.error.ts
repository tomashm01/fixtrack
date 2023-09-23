import { NotFoundException } from '@nestjs/common';
import { DeviceId } from '../model';

export class DeviceNotFoundError extends NotFoundException {
  public static withId(id: DeviceId): DeviceNotFoundError {
    return new DeviceNotFoundError(`Device with id ${id.value} not found`);
  }
}

import { CreateDeviceCommand } from './create-device.command';
import { CreateDeviceHandler } from './create-device.handler';
import { DeleteDeviceCommand } from './delete-device.command';
import { DeleteDeviceHandler } from './delete-device.handler';

export const CommandHandlers = [CreateDeviceHandler, DeleteDeviceHandler];

export const Commands = [CreateDeviceCommand, DeleteDeviceCommand];

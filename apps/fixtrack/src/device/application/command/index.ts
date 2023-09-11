import { CreateDeviceCommand } from "./create-device.command";
import { CreateDeviceHandler } from "./create-device.handler";
import { DeleteDeviceCommand } from "./delete-device.command";

export const CommandHandlers=[
  CreateDeviceHandler,
];

export const Commands=[
  CreateDeviceCommand,
  DeleteDeviceCommand
];
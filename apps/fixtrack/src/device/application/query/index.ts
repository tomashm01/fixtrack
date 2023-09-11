import { GetDeviceByIdQuery } from "./get-device-by-id.query";
import { GetDevicesHandler } from "./get-devices.handler";
import { GetDevicesQuery } from "./get-devices.query";

export const QueryHandlers=[
  GetDevicesHandler,
];

export const Queries=[
  GetDevicesQuery,
  GetDeviceByIdQuery,
];
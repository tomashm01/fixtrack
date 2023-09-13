import { DeviceWasCreatedProjection } from './device-was-created.projection';
import { DeviceWasDeletedProjection } from './device-was-deleted.projection';

export * from './device.schema';

export const ProjectionHandlers = [
  DeviceWasCreatedProjection,
  DeviceWasDeletedProjection
];

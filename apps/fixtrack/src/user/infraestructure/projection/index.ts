import { UserWasCreatedProjection } from './user-was-created.projection';
import { UserWasDeletedProjection } from './user-was-delete.projection';

export * from './user.schema';

export const ProjectionHandlers = [
  UserWasCreatedProjection,
  UserWasDeletedProjection
];
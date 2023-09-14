import { PasswordWasChangedProjection } from './password-was-changed.projection';
import { UserWasCreatedProjection } from './user-was-created.projection';
import { UserWasDeletedProjection } from './user-was-deleted.projection';

export * from './user.schema';

export const ProjectionHandlers = [
  UserWasCreatedProjection,
  UserWasDeletedProjection,
  PasswordWasChangedProjection
];

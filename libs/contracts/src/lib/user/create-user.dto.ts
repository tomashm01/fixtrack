import { KnownRoles as Role} from '../auth';

export class CreateUserDTO {
  email: string;
  plainPassword: string;
  roles: Role;
}

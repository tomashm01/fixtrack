import { KnownRoles as Role} from '../auth';

export class CreateUserDTO {
  id: string;
  email: string;
  password: string;
  role: Role;
}

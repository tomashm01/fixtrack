import { ValueObject } from '@fixtrack/domain';
import { KnownRoles as Role } from '@fixtrack/contracts';

interface Props {
  value: Role;
}

export class UserRole extends ValueObject<Props> {
  public static with(name: string): UserRole {
    if (name.length === 0) {
      throw new Error('Role cannot be empty');
    }

    name = name.toUpperCase();

    if (!Object.values(Role).includes(name as Role)) {
        throw new Error(`Invalid role: ${name}. Allowed roles are: ${Object.values(Role).join(', ')}`);
    }

    return new UserRole({ value: name as Role });
  }

  get value(): string {
    return this.props.value;
  }
}

import { ValueObject } from '@fixtrack/domain';

interface Props {
  value: string;
}

export class UserPassword extends ValueObject<Props> {
  public static with(name: string): UserPassword {
    if (name.length < 8) {
      throw new Error('Password too short');
    }

    return new UserPassword({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}

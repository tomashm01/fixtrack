import { ValueObject } from '@fixtrack/domain';

interface Props {
  value: string;
}

export class UserEmail extends ValueObject<Props> {
  public static readonly maxLength: number = 255;
  public static readonly emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  public static with(email: string): UserEmail {
    if (email.length === 0) {
      throw new Error('Email cannot be empty');
    }

    if (email.length > UserEmail.maxLength) {
      throw new Error(
        `Email cannot be longer than ${UserEmail.maxLength} characters`
      );
    }
    if (!UserEmail.emailRegex.test(email)) {
      throw new Error('Email must be a valid email address');
    }
    return new UserEmail({ value: email });
  }

  get value(): string {
    return this.props.value;
  }
}

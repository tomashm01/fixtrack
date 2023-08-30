import { UserPassword } from '../../../../fixtrack/src/user/domain';

describe('Password', () => {
  it('should create a valid password', () => {
    const password = UserPassword.with('StrongPasswordHere');
    expect(password.value).toBe('StrongPasswordHere');
  });

  it('should throw an error for short password', () => {
    expect(() => UserPassword.with('short')).toThrowError('Password too short');
  });
});
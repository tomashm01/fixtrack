import { UserEmail } from '../../../../fixtrack/src/user/domain';
describe('Email', () => {
  it('should create a valid email', () => {
    const email = UserEmail.with('john.doe@example.com');
    expect(email.value).toBe('john.doe@example.com');
  });

  it('should throw an error for invalid email', () => {
    expect(() => UserEmail.with('invalid-email')).toThrowError(
      'Email must be a valid email address'
    );
  });
});

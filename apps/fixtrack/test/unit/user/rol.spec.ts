import { UserRole } from '../../../../fixtrack/src/user/domain';

describe('Role', () => {
  it('should create a valid role', () => {
    const role = UserRole.with('ADMIN');
    expect(role.value).toBe('ADMIN');
  });

  it('should throw an error for invalid role', () => {
    expect(() => UserRole.with('INVALID_ROLE')).toThrowError('Invalid role');
  });
});

import { UserId } from '../../../../fixtrack/src/user/domain';

describe('UserId', () => {
  it('should create a valid user ID', () => {
    const userId = UserId.with('03be7a72-9395-45ca-9408-d69d46ef5eae');
    expect(userId.value).toBe('03be7a72-9395-45ca-9408-d69d46ef5eae');
  });

  it('should throw an error for invalid user ID', () => {
    expect(() => UserId.with('')).toThrowError(' is not a valid uuid v4.');
  });
});
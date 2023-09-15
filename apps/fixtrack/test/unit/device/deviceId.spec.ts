import { DeviceId } from '../../../../fixtrack/src/device/domain';

describe('DeviceId', () => {
  it('should create a valid device ID', () => {
    const userId = DeviceId.with('03be7a72-9395-45ca-9408-d69d46ef5eae');
    expect(userId.value).toBe('03be7a72-9395-45ca-9408-d69d46ef5eae');
  });

  it('should throw an error for invalid device ID', () => {
    expect(() => DeviceId.with('')).toThrowError(' is not a valid uuid v4.');
  });
});

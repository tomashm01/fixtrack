import { WorkOrderIdDevice } from '../../../../fixtrack/src/work-order/domain';
describe('WorkOrderIdDevice', () => {
  it('should create a valid workOrder ID device', () => {
    const workOrderIdDevice = WorkOrderIdDevice.with(
      '03be7a72-9395-45ca-9408-d69d46ef5eae'
    );
    expect(workOrderIdDevice.value).toBe(
      '03be7a72-9395-45ca-9408-d69d46ef5eae'
    );
  });

  it('should throw an error for invalid workOrder ID device', () => {
    expect(() => WorkOrderIdDevice.with('')).toThrowError(
      ' is not a valid uuid v4.'
    );
  });
});

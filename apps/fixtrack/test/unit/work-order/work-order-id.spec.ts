import { WorkOrderId } from '../../../../fixtrack/src/work-order/domain';
describe('WorkOrderID', () => {
  it('should create a valid workOrder ID', () => {
    const workOrderId = WorkOrderId.with(
      '03be7a72-9395-45ca-9408-d69d46ef5eae'
    );
    expect(workOrderId.value).toBe('03be7a72-9395-45ca-9408-d69d46ef5eae');
  });

  it('should throw an error for invalid workOrder ID', () => {
    expect(() => WorkOrderId.with('')).toThrowError(' is not a valid uuid v4.');
  });
});

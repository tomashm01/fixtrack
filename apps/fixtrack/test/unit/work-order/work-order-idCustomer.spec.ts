import { WorkOrderIdCustomer } from '../../../../fixtrack/src/work-order/domain';
describe('WorkOrderIdCustomer', () => {
  it('should create a valid workOrder ID customer', () => {
    const workOrderIdCustomer = WorkOrderIdCustomer.with(
      '03be7a72-9395-45ca-9408-d69d46ef5eae'
    );
    expect(workOrderIdCustomer.value).toBe(
      '03be7a72-9395-45ca-9408-d69d46ef5eae'
    );
  });

  it('should throw an error for invalid workOrder ID customer', () => {
    expect(() => WorkOrderIdCustomer.with('')).toThrowError(
      ' is not a valid uuid v4.'
    );
  });
});

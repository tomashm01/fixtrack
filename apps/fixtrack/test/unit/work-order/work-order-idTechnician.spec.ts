import { WorkOrderIdTechnician } from '../../../../fixtrack/src/work-order/domain';
describe('WorkOrderIdTechnician', () => {
  it('should create a valid workOrder ID technician', () => {
    const workOrderIdTechnician = WorkOrderIdTechnician.with(
      '03be7a72-9395-45ca-9408-d69d46ef5eae'
    );
    expect(workOrderIdTechnician.value).toBe(
      '03be7a72-9395-45ca-9408-d69d46ef5eae'
    );
  });

  it('should throw an error for invalid workOrder ID technician', () => {
    expect(() => WorkOrderIdTechnician.with('')).toThrowError(
      ' is not a valid uuid v4.'
    );
  });
});

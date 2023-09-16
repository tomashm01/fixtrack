import { WorkOrderEndDate } from '../../../../fixtrack/src/work-order/domain';

describe('WorkOrder end date', () => {
  it('should create a valid workOrder end date', () => {
    const date = WorkOrderEndDate.with(new Date('2020-01-01'));
    expect(date.value).toBe('2020-01-01');
  });

  it('should throw an error for invalid workOrder end date', () => {
    expect(() => WorkOrderEndDate.with(new Date('2030-01-01'))).toThrowError(
      'End date cannot be in the future'
    );
  });

  it('should throw an error for empty workOrder end date', () => {
    expect(() => WorkOrderEndDate.with(new Date(''))).toThrowError(
      'Invalid time value'
    );
  });
});

import { WorkOrderStartDate } from '../../../../fixtrack/src/work-order/domain';

describe('WorkOrder start date', () => {
  it('should create a valid workOrder start date', () => {
    const date = WorkOrderStartDate.with(new Date('2020-01-01'));
    expect(date.value?.toISOString()).toBe(
      new Date('2020-01-01').toISOString()
    );
  });

  it('should throw an error for invalid workOrder start date', () => {
    expect(() => WorkOrderStartDate.with(new Date('2030-01-01'))).toThrowError(
      'Start date cannot be in the future'
    );
  });
});

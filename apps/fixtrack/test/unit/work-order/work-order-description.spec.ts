import { WorkOrderDescription } from '../../../../fixtrack/src/work-order/domain';

describe('WorkOrder description', () => {
  it('should create a valid workOrder description', () => {
    const description = WorkOrderDescription.with('Some text here');
    expect(description.value).toBe('Some text here');
  });

  it('should throw an error for empty workOrder description', () => {
    expect(() => WorkOrderDescription.with('')).toThrowError(
      'Description cannot be empty'
    );
  });
});

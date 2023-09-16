import { WorkOrderStatus } from '../../../../fixtrack/src/work-order/domain';

describe('Status', () => {
  it('should create a valid status', () => {
    const status = WorkOrderStatus.with('PENDING');
    expect(status.value).toBe('PENDING');
  });

  it('should throw an error for invalid status', () => {
    expect(() => WorkOrderStatus.with('INVALID_STATUS')).toThrowError(
      'STATUS INVÁLIDO'
    );
  });
});

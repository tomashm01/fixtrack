import { WorkOrderPrice } from '../../../../fixtrack/src/work-order/domain';

describe('WorkOrder price', () => {
  it('should create a valid integer price', () => {
    const price = WorkOrderPrice.with(50);
    expect(price.value).toBe(50);
  });

  it('should create a valid float price', () => {
    const price = WorkOrderPrice.with(50.5);
    expect(price.value).toBe(50.5);
  });

  it('should throw an error for price', () => {
    expect(() => WorkOrderPrice.with(-5)).toThrowError(
      'Price cannot be negative'
    );
  });
});

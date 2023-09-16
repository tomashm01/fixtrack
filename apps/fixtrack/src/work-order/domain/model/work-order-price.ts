import { ValueObject } from '@fixtrack/domain';

interface Props {
  value: number;
}

export class WorkOrderPrice extends ValueObject<Props> {
  public static with(price: number): WorkOrderPrice {
    if (price < 0) {
      throw new Error('Price cannot be negative');
    }
    return new WorkOrderPrice({ value: price });
  }

  get value(): number {
    return this.props.value;
  }
}

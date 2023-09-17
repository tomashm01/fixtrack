import { ApiProperty } from '@nestjs/swagger';
import { Status } from './status.dto';

export class WorkOrderDTO {
  @ApiProperty({
    example: '2f72afcc-dc21-40ec-b23f-4118ea23efd6',
    description: 'The id of the work-Order'
  })
  _id: string;

  @ApiProperty({
    example: '2f72afcc-dc21-40ec-b23f-4118ea23efd6',
    description: 'The id of the customer'
  })
  idCustomer: string;

  @ApiProperty({
    example: '2f72afcc-dc21-40ec-b23f-4118ea23efd6',
    description: 'The id of the device'
  })
  idDevice: string;

  @ApiProperty({
    example: '2f72afcc-dc21-40ec-b23f-4118ea23efd6',
    description: 'The id of the technician'
  })
  idTechnician: string;

  @ApiProperty({
    example: 'PENDING',
    description: 'The status of the work-order',
    enum: Status
  })
  status: string;

  @ApiProperty({
    example: '2021-05-05T00:00:00.000Z',
    description: 'The start date of the work-order'
  })
  startDate: Date;

  @ApiProperty({
    example: 100,
    description: 'The price of the work-order'
  })
  price: number;

  @ApiProperty({
    example: 'The device is broken',
    description: 'The description of the work-order'
  })
  description: string;

  @ApiProperty({
    example: '2021-05-05T00:00:00.000Z',
    description: 'The end date of the work-order'
  })
  endDate?: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from './type.enum';
import { Brand } from './brand.enum';

interface Props {
  _id?: string;
  model: string;
  type: string;
  brand: string;
}

export class DeviceDTO {
  constructor(props: Props) {
    this._id = props._id;
    this.model = props.model;
    this.type = props.type;
    this.brand = props.brand;
  }

  @ApiProperty({
    example: 'af727a9e-46ac-11ee-be56-0242ac120002',
    description: 'The id of the device'
  })
  _id: string;

  @ApiProperty({
    example: 'IPHONE 14 PRO',
    description: 'The model of the device'
  })
  model: string;

  @ApiProperty({
    example: 'PHONE',
    description: 'The type of the device',
    enum: Type
  })
  type: string;

  @ApiProperty({
    example: 'APPLE',
    description: 'The brand of the device',
    enum: Brand
  })
  brand: string;
}

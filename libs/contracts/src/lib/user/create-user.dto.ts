import { ApiProperty } from '@nestjs/swagger';

import { KnownRoles, KnownRoles as Role } from '../auth';

export class CreateUserDTO {
  @ApiProperty({
    example: '2f72afcc-dc21-40ec-b23f-4118ea23efd6',
    description: 'The id of the user'
  })
  _id: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user'
  })
  email: string;

  @ApiProperty({
    example: 'StrongPasswordHere',
    description: 'The password of the user'
  })
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'The role of the user',
    enum: KnownRoles
  })
  role: string;
}

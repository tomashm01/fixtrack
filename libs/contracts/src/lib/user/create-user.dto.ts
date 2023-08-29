import { ApiProperty } from '@nestjs/swagger';

import { KnownRoles, KnownRoles as Role} from '../auth';

export class CreateUserDTO {
  
  id: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'StrongPasswordHere',
    description: 'The password of the user',
  })
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'The role of the user',
    enum: KnownRoles
  })
  role: Role;
}

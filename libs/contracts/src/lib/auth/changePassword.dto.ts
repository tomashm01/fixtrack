import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordRequestDTO {
  @ApiProperty({
    description: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYTA0YWFkNC01OGY2LTQxYzQtOTAxYy00ZWRlY2JhYmM2NDEiLCJpYXQiOjE2OTQ2ODM1MzksImV4cCI6MTY5NDc2OTkzOX0.A8sYbMVMZxL3gRvKtXMzWtmZ-ntkwjWYvYij-noO5Ag',
    type: String,
  })
  token: string;

  @ApiProperty({
    description: 'contraseñaActual',
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'newPassword',
    type: String,
  })
  newpassword: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { CredentialsInterface } from '../auth/credentials.interface';

export class LoginDTO implements CredentialsInterface {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

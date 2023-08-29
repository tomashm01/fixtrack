import { ApiProperty } from "@nestjs/swagger";
import { KnownRoles } from "../auth";

export class UserDTO {

    @ApiProperty({
        example: 'af727a9e-46ac-11ee-be56-0242ac120002',
        description: 'The id of the user',
    })
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
    role: string;
}
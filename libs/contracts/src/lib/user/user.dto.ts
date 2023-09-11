import { ApiProperty } from "@nestjs/swagger";
import { KnownRoles } from "../auth";

interface Props {
  _id?: string;
  id?: string;
  email: string;
  password: string;
  role: string;
}

export class UserDTO {

  constructor(props:Props){
    this.id = props._id || props.id;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
  }

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
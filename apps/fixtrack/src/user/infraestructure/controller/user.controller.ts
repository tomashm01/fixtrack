import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDTO, UserDTO } from '@fixtrack/contracts';

@ApiTags('UserController')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Users found.', type: UserDTO  })
  findAll(): Promise<Array<UserDTO>> {
    return this.userService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ status: 200, description: 'User created', type: UserDTO  })
  async create(
    @Body() createUserDto: CreateUserDTO
  ): Promise<UserDTO> {
    //const password = await this.authService.encodePassword(createUserDto.plainPassword);

    return this.userService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.role
    );
  }

}

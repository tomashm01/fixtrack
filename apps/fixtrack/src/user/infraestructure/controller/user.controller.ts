import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';


import { UserService } from '../service/user.service';
import { CreateUserDTO, UserDTO } from '@fixtrack/contracts';
import { IdAlreadyRegisteredError } from '@aulasoftwarelibre/nestjs-eventstore';
import { catchError } from '../../../utils';

@ApiTags('UserController')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiOkResponse({ type: UserDTO })
  findAll(): Promise<UserDTO[]> {
    return this.userService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiBody({ type: CreateUserDTO })
  @ApiOkResponse({ type: UserDTO })
  async create(
    @Body() createUserDto: CreateUserDTO
  ): Promise<UserDTO> {
    //const password = await this.authService.encodePassword(createUserDto.plainPassword);
    try {
      return await this.userService.createUser(createUserDto);
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
    
  }

}

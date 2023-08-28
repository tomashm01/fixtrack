import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { UserDTO } from '@fixtrack/contracts';

@ApiTags('UserController')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Users found.' })
  findAll(): Promise<Array<UserDTO>> {
    return this.userService.getUsers();
  }

}

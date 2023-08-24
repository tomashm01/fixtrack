import { Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('UserController')
@Controller('user')
export class UserController {

  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Users found.' })
  findAll(): string {
    return 'Devuelve algo';
  }

  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiResponse({ status: 200, description: 'User created.' })
  create(): string {
    return 'Devuelve algo';
  }
}

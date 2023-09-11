import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';


import { CreateUserDTO, DeviceDTO, LoginDTO, RoleResponse, TokenResponse, UserDTO, UserDeleteResponse } from '@fixtrack/contracts';
import { IdAlreadyRegisteredError, IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';
import { catchError } from '../../../utils';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetDevicesQuery } from '../../application/query/get-devices.query';
import { DeviceAlreadyExistsError } from '../../domain';
import { CreateDeviceCommand } from '../../application/command/create-device.command';

@ApiTags('DeviceController')
@Controller('device')
export class DeviceController {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus:CommandBus
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los dispositivos' })
  @ApiOkResponse({ type: DeviceDTO })
  findAll(): Promise<DeviceDTO[] | null> {
    return this.queryBus.execute(new GetDevicesQuery());
  }

  @Post()
  @ApiOperation({ summary: 'Crear un dispositivo' })
  @ApiBody({ type: DeviceDTO })
  @ApiOkResponse({ type: DeviceDTO })
  async create(
    @Body() deviceDTO: DeviceDTO
  ): Promise<DeviceDTO> {
    try {
      return await this.commandBus.execute(new CreateDeviceCommand(deviceDTO._id,deviceDTO.model,deviceDTO.type,deviceDTO.brand));
    } catch (e) {
      if (e instanceof DeviceAlreadyExistsError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  /*
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por id' })
  @ApiOkResponse({ type: UserDTO })
  async findOne(@Param('id') id: string): Promise<UserDTO | null> {
    try {
      return await this.userService.getUserById(id);
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por id' })
  @ApiOkResponse({ type: UserId })
  async delete(@Param('id') id: string): Promise<UserDeleteResponse> {
    try {
      await this.userService.deleteUser(UserId.with(id));
      return {
        id: id,
        message: 'User deleted',
      }
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }

  */



}

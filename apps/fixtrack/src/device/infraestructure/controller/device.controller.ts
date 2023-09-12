import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';


import { CreateUserDTO, DeviceDTO, DeviceDeleteResponse, LoginDTO, RoleResponse, TokenResponse, UserDTO, UserDeleteResponse } from '@fixtrack/contracts';
import { IdAlreadyRegisteredError, IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';
import { catchError } from '../../../utils';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetDevicesQuery } from '../../application/query/get-devices.query';
import { DeviceAlreadyExistsError, DeviceId, DeviceNotFoundError } from '../../domain';
import { CreateDeviceCommand } from '../../application/command/create-device.command';
import { DeleteDeviceCommand } from '../../application/command/delete-device.command';
import { GetDeviceByIdQuery } from '../../application/query/get-device-by-id.query';

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

  
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un dispositivo por id' })
  @ApiOkResponse({ type: DeviceId })
  async delete(@Param('id') id: string): Promise<DeviceDeleteResponse> {
    try {
      await this.commandBus.execute(new DeleteDeviceCommand(id));
      return {
        id: id,
        message: 'Device deleted',
      }
    } catch (e) {
      if (e instanceof DeviceNotFoundError) {
        throw new NotFoundException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un dispositivo por id' })
  @ApiOkResponse({ type: DeviceDTO })
  async findById(@Param('id') id: string): Promise<DeviceDTO> {
    try {
      return await this.queryBus.execute(new GetDeviceByIdQuery(id));
    } catch (e) {
      if (e instanceof DeviceNotFoundError) {
        throw new NotFoundException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  



}

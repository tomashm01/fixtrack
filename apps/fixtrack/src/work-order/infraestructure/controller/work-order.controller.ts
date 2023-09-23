import {
  CreateWorkOrderDTO,
  DeleteWorkOrderDTO,
  WorkOrderDTO,
  WorkOrderResponse
} from '@fixtrack/contracts';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetWorkOrdersQuery } from '../../application/query/get-work-orders.query';
import { CreateWorkOrderCommand } from '../../application/command/create-work-order.command';
import {
  WorkOrderAlreadyExistsError,
  WorkOrderId,
  WorkOrderNotFound
} from '../../domain';
import { catchError } from 'apps/fixtrack/src/utils';
import { UpdateWorkOrderCommand } from '../../application/command/update-work-order.command';
import { DeleteWorkOrderCommand } from '../../application/command/delete-work-order.command';
import { GetWorkOrdersByUserIdQuery } from '../../application/query/get-work-orders-by-userId.query';
import { UserNotFoundError } from 'apps/fixtrack/src/user/domain';
import { GetWorkOrdersByTechIdQuery } from '../../application/query/get-work-orders-by-techId.query';

@ApiTags('WorkOrderController')
@Controller('WorkOrder')
export class WorkOrderController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las órdenes de trabajo' })
  @ApiOkResponse({ type: WorkOrderDTO })
  findAll(): Promise<WorkOrderDTO[] | null> {
    return this.queryBus.execute(new GetWorkOrdersQuery());
  }

  @Post()
  @ApiOperation({ summary: 'Crear una orden de trabajo' })
  @ApiBody({ type: WorkOrderDTO })
  @ApiOkResponse({ type: WorkOrderDTO })
  async create(
    @Body() workOrderDto: CreateWorkOrderDTO
  ): Promise<WorkOrderDTO> {
    try {
      return await this.commandBus.execute(
        new CreateWorkOrderCommand(
          workOrderDto._id,
          workOrderDto.idCustomer,
          workOrderDto.idTechnician,
          workOrderDto.idDevice,
          workOrderDto.description,
          workOrderDto.status,
          workOrderDto.startDate,
          workOrderDto.price
        )
      );
    } catch (e) {
      if (e instanceof WorkOrderAlreadyExistsError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  @Patch()
  @ApiOperation({ summary: 'Actualizar una orden de trabajo' })
  @ApiBody({ type: WorkOrderDTO })
  @ApiOkResponse({ type: WorkOrderDTO })
  async update(@Body() workOrderDto: WorkOrderDTO): Promise<WorkOrderResponse> {
    try {
      await this.commandBus.execute(
        new UpdateWorkOrderCommand(
          workOrderDto._id,
          workOrderDto.idCustomer,
          workOrderDto.idTechnician,
          workOrderDto.idDevice,
          workOrderDto.description,
          workOrderDto.status,
          workOrderDto.startDate,
          workOrderDto.price,
          workOrderDto.endDate
        )
      );
      return {
        id: workOrderDto._id,
        message: 'Orden de trabajo actualizada'
      };
    } catch (e) {
      if (e instanceof WorkOrderNotFound) {
        throw new NotFoundException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una orden de trabajo por id' })
  @ApiOkResponse({ type: WorkOrderId })
  async delete(@Param('id') id: string): Promise<WorkOrderResponse> {
    try {
      await this.commandBus.execute(new DeleteWorkOrderCommand(id));
      return {
        id: id,
        message: 'Orden de trabajo eliminada'
      };
    } catch (e) {
      if (e instanceof WorkOrderNotFound) {
        throw new NotFoundException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  @Get('user/:idUser')
  @ApiOperation({ summary: 'Obtener órdenes de trabajo de usuario por idUser' })
  @ApiOkResponse({ type: WorkOrderDTO })
  async findByUserId(@Param('idUser') id: string): Promise<WorkOrderDTO[]> {
    try {
      return this.queryBus.execute(new GetWorkOrdersByUserIdQuery(id));
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException(e.message);
      } else {
        throw new InternalServerErrorException(e.message);
      }
    }
  }

  @Get('tech/:idTech')
  @ApiOperation({ summary: 'Obtener órdenes de trabajo de técnico por idTech' })
  @ApiOkResponse({ type: WorkOrderDTO })
  async findByTechId(@Param('idTech') id: string): Promise<WorkOrderDTO[]> {
    try {
      return this.queryBus.execute(new GetWorkOrdersByTechIdQuery(id));
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException(e.message);
      } else {
        throw new InternalServerErrorException(e.message);
      }
    }
  }
}

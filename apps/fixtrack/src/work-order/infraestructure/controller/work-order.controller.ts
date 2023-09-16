import { CreateWorkOrderDTO, WorkOrderDTO } from '@fixtrack/contracts';
import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetWorkOrdersQuery } from '../../application/query/get-work-orders.query';
import { CreateWorkOrderCommand } from '../../application/command/create-work-order.command';
import { WorkOrderAlreadyExistsError } from '../../domain';
import { catchError } from 'apps/fixtrack/src/utils';

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
}

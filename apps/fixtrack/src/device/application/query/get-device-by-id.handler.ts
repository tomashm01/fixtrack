import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';

import { DeviceDTO } from '@fixtrack/contracts';
import { DeviceId } from '../../domain';
import { GetDeviceByIdQuery } from './get-device-by-id.query';
import { DEVICE_FINDER, DeviceFinder } from '../service/device-finder.service';

@QueryHandler(GetDeviceByIdQuery)
export class GetDeviceByIdHandler implements IQueryHandler<GetDeviceByIdQuery> {
  constructor(
    @Inject(DEVICE_FINDER) private readonly deviceFinder: DeviceFinder
  ) {}

  async execute(query: GetDeviceByIdQuery): Promise<DeviceDTO | null> {
    const deviceDto: DeviceDTO = await this.deviceFinder.findById(
      DeviceId.with(query.id)
    );

    if (!deviceDto) throw new IdNotFoundError(query.id);

    return deviceDto;
  }
}

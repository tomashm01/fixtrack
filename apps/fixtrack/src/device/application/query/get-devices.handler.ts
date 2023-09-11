import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DeviceDTO} from '@fixtrack/contracts';
import { Nullable } from '@fixtrack/domain';
import { GetDevicesQuery } from './get-devices.query';
import { DEVICE_FINDER, DeviceFinder } from '../service/device-finder.service';

@QueryHandler(GetDevicesQuery)
export class GetDevicesHandler implements IQueryHandler<GetDevicesQuery> {
  constructor(@Inject(DEVICE_FINDER)
  private readonly deviceFinder:DeviceFinder
  ) {}

  async execute(): Promise<Nullable<DeviceDTO[]>> {
    return this.deviceFinder.findAll();
  }
}

import { DEVICE_FINDER } from './application/service/device-finder.service';
import { DeviceMongoFinderService } from './infraestructure/service';

export const DeviceProviders = [
  {
    provide: DEVICE_FINDER,
    useClass: DeviceMongoFinderService
  }
];

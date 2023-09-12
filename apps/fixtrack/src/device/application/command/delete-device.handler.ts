import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { AggregateRepository, InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { DeleteDeviceCommand } from "./delete-device.command";
import { Device, DeviceId, DeviceNotFoundError } from "../../domain";
import { DEVICE_FINDER, DeviceFinder } from "../service/device-finder.service";
import { DeviceDTO } from "@fixtrack/contracts";




@CommandHandler(DeleteDeviceCommand)
export class DeleteDeviceHandler implements ICommandHandler<DeleteDeviceCommand> {
  constructor(
  @InjectAggregateRepository(Device) private readonly devices: AggregateRepository<Device, DeviceId>,
  @Inject(DEVICE_FINDER) private readonly deviceFinder: DeviceFinder
  ) {}

  async execute(command: DeleteDeviceCommand) : Promise<void> {
    const deviceId : DeviceId = DeviceId.with(command.id);

    const deviceDto:DeviceDTO=await this.deviceFinder.findById(deviceId);
    if(!deviceDto) throw DeviceNotFoundError.withId(deviceId);

    const device: Device = await this.devices.find(deviceId);

    device.delete();
    this.devices.save(device);
    
  }
}

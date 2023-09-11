import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { AggregateRepository, InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { CreateDeviceCommand } from "./create-device.command";
import { Device, DeviceAlreadyExistsError, DeviceBrand, DeviceId, DeviceModel, DeviceType } from "../../domain";
import { DEVICE_FINDER, DeviceFinder } from "../service/device-finder.service";
import { DeviceDTO } from "@fixtrack/contracts";



@CommandHandler(CreateDeviceCommand)
export class CreateDeviceHandler implements ICommandHandler<CreateDeviceCommand> {
  constructor(
  @InjectAggregateRepository(Device) private readonly users: AggregateRepository<Device, DeviceId>,
  @Inject(DEVICE_FINDER) private readonly deviceFinder:DeviceFinder
  ) {}

  async execute(command: CreateDeviceCommand) : Promise<Device> {

    const deviceId: DeviceId = DeviceId.with(command.id);
    const deviceModel: DeviceModel = DeviceModel.with(command.model);
    const deviceType: DeviceType = DeviceType.with(command.type);
    const deviceBrand: DeviceBrand = DeviceBrand.with(command.brand);

    if(await this.deviceFinder.findById(deviceId) !=null) throw DeviceAlreadyExistsError.withId(deviceId); 
    if(await this.deviceFinder.findByModel(deviceModel) !=null) throw DeviceAlreadyExistsError.withModel(deviceModel);

    const device: Device= Device.add(deviceId,deviceModel,deviceType,deviceBrand);

    await this.users.save(device);
    return device;
  
  }
}

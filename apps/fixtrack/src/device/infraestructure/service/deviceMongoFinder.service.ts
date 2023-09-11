import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { DeviceFinder } from "../../application/service/device-finder.service";
import { DeviceDTO } from "@fixtrack/contracts";
import { DeviceBrand, DeviceId, DeviceModel, DeviceType } from "../../domain";
import { DEVICE_PROJECTION, DeviceDocument } from "../projection";

@Injectable()
export class DeviceMongoFinderService implements DeviceFinder{
  constructor(
    @InjectModel(DEVICE_PROJECTION) private readonly deviceModel: Model<DeviceDocument>
  ){}

  async findById(id: DeviceId): Promise<DeviceDTO | null> {
    return await this.deviceModel.findById(id.value).exec();
  }

  async findAll(): Promise<DeviceDTO[]> {
    return await this.deviceModel.find().exec();
  }

  async findByModel(model: DeviceModel): Promise<DeviceDTO | null> {
    return await this.deviceModel.findOne({ model: model.value }).exec();
  }

  async findByBrand(brand: DeviceBrand): Promise<DeviceDTO | null> {
    return await this.deviceModel.findOne({ brand: brand.value }).exec();
  }

  async findByType(type: DeviceType): Promise<DeviceDTO | null> {
    return await this.deviceModel.findOne({ type: type.value }).exec();
  }

}
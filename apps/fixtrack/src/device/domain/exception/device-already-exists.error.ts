import { DeviceBrand, DeviceId, DeviceModel, DeviceType } from "../model";
import { DeviceError } from "./device.error";


export class DeviceAlreadyExistsError extends DeviceError {
  public static withId(id: DeviceId): DeviceAlreadyExistsError {
    return new DeviceAlreadyExistsError(
      `Device with id ${id.value} already exists`,
    );
  }

  public static withModel(model:DeviceModel): DeviceAlreadyExistsError {
    return new DeviceAlreadyExistsError(
      `Device with model ${model.value} already exists`,
    );
  }

}

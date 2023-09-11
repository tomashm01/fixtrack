import { EncryptedAggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';


import { DeviceId } from './device-id';
import { DeviceModel } from './device-model';
import { DeviceType } from './device-type';
import { DeviceBrand } from './device-brand';
import { DeviceWasCreated } from '../event/device-was-created.event';
import { DeviceWasDeleted } from '../event';


export class Device extends EncryptedAggregateRoot {
  private _id: DeviceId;
  private _model: DeviceModel;
  private _type: DeviceType;
  private _brand: DeviceBrand;
  private _deleted: boolean=false;


  public static add(
    id: DeviceId,
    model: DeviceModel,
    type: DeviceType,
    brand: DeviceBrand
  ): Device {
    const user = new Device();
    user.apply(
      new DeviceWasCreated(id.value, model.value, type.value, brand.value)
    );

    return user;
  }

  delete(): void {
    if (!this._deleted) this.apply(new DeviceWasDeleted(this._id.value));
  }

  public aggregateId(): string {
    return this._id.value;
  }

  public get deleted(): boolean {
    return this._deleted;
  }

  public get id(): DeviceId {
    return this._id;
  }

  public get model(): DeviceModel {
    return this._model;
  }

  public get type(): DeviceType {
    return this._type;
  }

  public get brand(): DeviceBrand {
    return this._brand;
  }

  private onDeviceWasCreated(event: DeviceWasCreated): void {
    this._id = DeviceId.with(event.id);
    this._model = DeviceModel.with(event.model);
    this._type = DeviceType.with(event.type);
    this._brand = DeviceBrand.with(event.brand);
  }

  private onDeviceWasDeleted(event: DeviceWasDeleted): void {
    this._deleted = true;
  }

}

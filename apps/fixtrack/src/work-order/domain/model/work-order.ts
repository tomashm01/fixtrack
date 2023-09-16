import { EncryptedAggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { WorkOrderId } from './work-order-id';
import { WorkOrderStartDate } from './work-order-start-date';
import { WorkOrderEndDate } from './work-order-end-date';
import { WorkOrderStatus } from './work-order-status';
import { WorkOrderIdTechnician } from './work-order-idTechnician';
import { WorkOrderIdCustomer } from './work-order-idCustomer';
import { WorkOrderIdDevice } from './work-order-idDevice';
import { WorkOrderDescription } from './work-order-description';
import { WorkOrderPrice } from './work-order-price';

export class WorkOrder extends EncryptedAggregateRoot {
  private _workOrderId: WorkOrderId;
  private _workOrderIdTechnician: WorkOrderIdTechnician;
  private _workOrderIdCustomer: WorkOrderIdCustomer;
  private _workOrderIdDevice: WorkOrderIdDevice;
  private _workOrderStartDate: WorkOrderStartDate;
  private _workOrderEndDate: WorkOrderEndDate;
  private _workOrderStatus: WorkOrderStatus;
  private _workOrderDescription: WorkOrderDescription;
  private _workOrderPrice: WorkOrderPrice;
  private _deleted: boolean = false;

  public static add(
    workOrderId: WorkOrderId,
    workOrderIdTechnician: WorkOrderIdTechnician,
    workOrderIdCustomer: WorkOrderIdCustomer,
    workOrderIdDevice: WorkOrderIdDevice,
    workOrderStartDate: WorkOrderStartDate,
    workOrderStatus: WorkOrderStatus,
    workOrderDescription: WorkOrderDescription,
    workOrderPrice: WorkOrderPrice
  ): WorkOrder {
    const workOrder = new WorkOrder();
    /*workOrder.apply(
      new WorkOrderWasCreated(
        workOrderId.value,
        workOrderIdTechnician.value,
        workOrderIdCustomer.value,
        workOrderIdDevice.value,
        workOrderStartDate.value,
        workOrderStatus.value,
        workOrderDescription.value,
        workOrderPrice.value
      )
    );
        */
    return workOrder;
  }

  updateWorkOrder(
    workOrderId: WorkOrderId,
    workOrderIdTechnician: WorkOrderIdTechnician,
    workOrderIdCustomer: WorkOrderIdCustomer,
    workOrderIdDevice: WorkOrderIdDevice,
    workOrderStartDate: WorkOrderStartDate,
    workOrderEndDate: WorkOrderEndDate,
    workOrderStatus: WorkOrderStatus,
    workOrderDescription: WorkOrderDescription,
    workOrderPrice: WorkOrderPrice
  ): void {
    if (!this._deleted) {
      /*this.apply(
        new WorkOrderWasUpdated(
          workOrderId.value,
          workOrderIdTechnician.value,
          workOrderIdCustomer.value,
          workOrderIdDevice.value,
          workOrderStartDate.value,
          workOrderEndDate.value,
          workOrderStatus.value,
          workOrderDescription.value,
          workOrderPrice.value
        )
      );*/
    }
  }

  delete(): void {
    //if (!this._deleted) this.apply(new WorkOrderWasDeleted(this._workOrderId.value));
  }

  public aggregateId(): string {
    return this._workOrderId.value;
  }

  get workOrderId(): WorkOrderId {
    return this._workOrderId;
  }

  get workOrderIdTechnician(): WorkOrderIdTechnician {
    return this._workOrderIdTechnician;
  }

  get workOrderIdCustomer(): WorkOrderIdCustomer {
    return this._workOrderIdCustomer;
  }

  get workOrderIdDevice(): WorkOrderIdDevice {
    return this._workOrderIdDevice;
  }

  get workOrderStartDate(): WorkOrderStartDate {
    return this._workOrderStartDate;
  }

  get workOrderEndDate(): WorkOrderEndDate {
    return this._workOrderEndDate;
  }

  get workOrderStatus(): WorkOrderStatus {
    return this._workOrderStatus;
  }

  get workOrderDescription(): WorkOrderDescription {
    return this._workOrderDescription;
  }

  get workOrderPrice(): WorkOrderPrice {
    return this._workOrderPrice;
  }

  public get deleted(): boolean {
    return this._deleted;
  }

  /*
  private onWorkOrderWasCreated(event: WorkOrderWasCreated) {
    this._workOrderId = WorkOrderId.with(event.id);
    this._workOrderIdTechnician = WorkOrderIdTechnician.with(event.idTechnician);
    this._workOrderIdCustomer = WorkOrderIdCustomer.with(event.idCustomer);
    this._workOrderIdDevice = WorkOrderIdDevice.with(event.idDevice);
    this._workOrderStartDate = WorkOrderStartDate.with(event.startDate);
    this._workOrderStatus = WorkOrderStatus.with(event.status);
    this._workOrderDescription = WorkOrderDescription.with(event.description);
    this._workOrderPrice = WorkOrderPrice.with(event.price);
  }

  private onWorkOrderWasDeleted(event: WorkOrderWasDeleted) {
    this._deleted = true;
  }

  private onWorkOrderWasUpdated(event: WorkOrderWasUpdated) {
    this._workOrderId = WorkOrderId.with(event.id);
    this._workOrderIdTechnician = WorkOrderIdTechnician.with(event.idTechnician);
    this._workOrderIdCustomer = WorkOrderIdCustomer.with(event.idCustomer);
    this._workOrderIdDevice = WorkOrderIdDevice.with(event.idDevice);
    this._workOrderStartDate = WorkOrderStartDate.with(event.startDate);
    this._workOrderEndDate = WorkOrderEndDate.with(event.endDate);
    this._workOrderStatus = WorkOrderStatus.with(event.status);
    this._workOrderDescription = WorkOrderDescription.with(event.description);
    this._workOrderPrice = WorkOrderPrice.with(event.price);
  }

  */
}

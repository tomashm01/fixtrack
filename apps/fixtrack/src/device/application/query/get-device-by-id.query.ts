import { IQuery } from "@nestjs/cqrs";

export class GetDeviceByIdQuery implements IQuery{
  constructor(public readonly id: string) {}
}
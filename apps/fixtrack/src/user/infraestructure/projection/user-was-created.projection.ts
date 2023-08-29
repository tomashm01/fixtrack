import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { UserWasCreated } from "../../domain";
import { USER_PROJECTION, UserDocument } from "./user.schema";

@EventsHandler(UserWasCreated)
export class UserWasCreatedProjection implements IEventHandler<UserWasCreated> {
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>,
  ) {}

  async handle(event: UserWasCreated): Promise<void> {
    const user = new this.userProjection({
      ...event.payload,
    });
    await user.save();
  }
}
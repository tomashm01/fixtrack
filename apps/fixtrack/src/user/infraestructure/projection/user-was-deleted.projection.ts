import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { UserWasDeleted } from "../../domain";
import { USER_PROJECTION, UserDocument } from "./user.schema";
import { RedisService } from "apps/fixtrack/src/redis.service";

@EventsHandler(UserWasDeleted)
export class UserWasDeletedProjection implements IEventHandler<UserWasDeleted> {
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>,
    private readonly redisService: RedisService,
  ) {}

  async handle(event: UserWasDeleted): Promise<void> {
    const userView = await this.userProjection.findById(event.id).exec();
    await userView.deleteOne({ _id: event.id});
    await this.redisService.del("user:" + event.id);
  }
}


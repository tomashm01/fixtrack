import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { UserWasCreated } from "../../domain";
import { USER_PROJECTION, UserDocument } from "./user.schema";
import { UserRedisService } from "../service/userRedis.service";
import { UserDTO } from "@fixtrack/contracts";

@EventsHandler(UserWasCreated)
export class UserWasCreatedProjection implements IEventHandler<UserWasCreated> {
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>,
    private readonly redisService: UserRedisService,
  ) {}

  async handle(event: UserWasCreated): Promise<void> {
    const user = new this.userProjection({
      ...event.payload,
    });
    await user.save();
    await this.redisService.set(event.payload._id, new UserDTO(event.payload));
  }
}


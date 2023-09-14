import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { USER_PROJECTION, UserDocument } from './user.schema';
import { RedisService } from 'apps/fixtrack/src/redis.service';
import { PasswordWasChanged } from '../../domain';

@EventsHandler(PasswordWasChanged)
export class PasswordWasChangedProjection
  implements IEventHandler<PasswordWasChanged>
{
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>,
    private readonly redisService: RedisService
  ) {}

  async handle(event: PasswordWasChanged): Promise<void> {
    const user = await this.userProjection.findOne({ _id: event.id });
    console.log(user);
    if (!user) return;

    user.password = event.password;

    await user.save();
    await this.redisService.set('user:' + event.id, JSON.stringify(user));
  }
}

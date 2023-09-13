import { Inject, Injectable } from '@nestjs/common';
import {
  USER_FINDER,
  UserFinder
} from '../../application/service/user-finder.service';
import { USER_REDIS_FINDER, UserRedisService } from './userRedis.service';
import { UserEmail, UserId } from '../../domain';
import { UserDTO } from '@fixtrack/contracts';
import { USER_MONGO_FINDER, UserMongoFinder } from './userMongoFinder.service';

@Injectable()
export class UserFinderService implements UserFinder {
  constructor(
    @Inject(USER_REDIS_FINDER) private readonly redisService: UserRedisService,
    @Inject(USER_MONGO_FINDER) private readonly mongoService: UserMongoFinder
  ) {}

  async findById(id: UserId): Promise<UserDTO | null> {
    return await this.redisService.findById(id);
  }

  async findAll(): Promise<UserDTO[]> {
    return await this.mongoService.findAll();
  }

  async findByEmail(email: UserEmail): Promise<UserDTO | null> {
    return await this.mongoService.findByEmail(email);
  }

  async deleteUser(id: UserId): Promise<void> {
    await this.mongoService.deleteUser(id);
    await this.redisService.deleteUser(id);
  }
}

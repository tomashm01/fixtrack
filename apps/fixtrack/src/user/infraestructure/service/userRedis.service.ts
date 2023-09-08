import { UserDTO } from '@fixtrack/contracts';
import { Injectable } from '@nestjs/common';
import { RedisService } from 'apps/fixtrack/src/redis.service';
import { UserId } from '../../domain';

export const USER_REDIS_FINDER = "UserRedisFinder";

@Injectable()
export class UserRedisService {

  constructor(private readonly redisService: RedisService) {}

  async findById(id: UserId): Promise<UserDTO | null> {
    const user = await this.redisService.get("user:" + id.value);
    return user ? new UserDTO(JSON.parse(user)) : null;
  }

  async deleteUser(id: UserId): Promise<boolean> {
    await this.redisService.del("user:" + id.value);
    return true;
  }

}

import { UserDTO } from '@fixtrack/contracts';
import { Injectable } from '@nestjs/common';

import { RedisService } from 'apps/fixtrack/src/redis.service';

@Injectable()
export class UserRedisService {

  constructor(private readonly redisService: RedisService) {}

  async findUserById(id: string): Promise<string> {
    const user = await this.redisService.get("user:"+id);
    return user;
  }

  async set(id: string, value: UserDTO): Promise<void> {
    await this.redisService.set("user:"+id, JSON.stringify(value));
  }

}

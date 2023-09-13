import { Injectable, Module } from '@nestjs/common';
import Redis from 'ioredis';

export const REDIS_SERVICE = 'REDIS_SERVICE';

@Injectable()
export class RedisService {
  redis: Redis;
  constructor() {
    this.redis = new Redis({
      host: 'redis',
      port: 6379
    });
  }

  async set(key: string, value: string | number | Buffer) {
    return await this.redis.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async hgetall(key: string): Promise<{ [key: string]: string }> {
    return await this.redis.hgetall(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.redis.keys(pattern);
  }

  async del(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}

@Module({
  exports: [RedisService],
  providers: [RedisService]
})
export class RedisModule {}

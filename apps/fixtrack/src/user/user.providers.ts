import { REDIS_SERVICE, RedisService } from "../redis.service";
import { USER_FINDER } from "./application/service/user-finder.service";
import { UserRedis } from "./infraestructure/service/userRedis.service";

export const UserProviders = [
  {
    provide: USER_FINDER,
    useClass: UserRedis,
  },
  {
    provide: REDIS_SERVICE,
    useClass: RedisService
  }
];
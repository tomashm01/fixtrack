import { REDIS_SERVICE, RedisService } from "../redis.service";
import { USER_FINDER } from "./application/service/user-finder.service";
import { USER_REDIS_FINDER, UserFinderService, UserRedisService } from "./infraestructure/service";
import { USER_MONGO_FINDER, UserMongoFinder } from "./infraestructure/service/userMongoFinder.service";

export const UserProviders = [
  {
    provide: USER_MONGO_FINDER,
    useClass: UserMongoFinder,
  },
  {
    provide: USER_REDIS_FINDER,
    useClass: UserRedisService
  },
  {
    provide: USER_FINDER,
    useClass: UserFinderService
  },
  {
    provide: REDIS_SERVICE,
    useClass: RedisService
  },
];
import { REDIS_SERVICE, RedisService } from "../redis.service";
import { USER_FINDER } from "./application/service/user-finder.service";
import { UserMongoFinder } from "./infraestructure/service/userMongoFinder.service";

export const UserProviders = [
  {
    provide: USER_FINDER,
    useClass: UserMongoFinder,
  },
  {
    provide: REDIS_SERVICE,
    useClass: RedisService
  },
];
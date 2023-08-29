import { Injectable } from "@nestjs/common";
import { UserFinder } from "../../application/service/user-finder.service";
import { UserDTO } from "@fixtrack/contracts";
import { RedisService } from "apps/fixtrack/src/redis.service";


@Injectable()
export class UserRedis implements UserFinder{
  constructor(private readonly redisService:RedisService ){}

  async findAll(): Promise<UserDTO[]> {
    const allUsersKeys= await this.redisService.keys('user*');
    const allUsers :UserDTO[] = [];

    for (const key of allUsersKeys) {
      const user = await this.redisService.hgetall(key);
      const userDTO: UserDTO = {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role
      };
      allUsers.push(userDTO);

    }
    return allUsers;

  }
}
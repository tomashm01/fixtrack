import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from '../application/query';
import { UserProviders } from '../user.providers';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { RedisModule } from '../../redis.service';

@Module({
  imports: [
    CqrsModule,
    RedisModule
  ],
  controllers: [UserController],
  providers: [
    ...QueryHandlers,
    ...UserProviders,
    UserService
  ],
  exports: [],
})
export class UserModule {}

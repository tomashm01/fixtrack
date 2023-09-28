import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { EventStoreModule, Event } from '@aulasoftwarelibre/nestjs-eventstore';

import { QueryHandlers } from '../application/query';
import { UserProviders } from '../user.providers';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { RedisModule } from '../../redis.service';
import { CommandHandlers } from '../application/command';
import { ProjectionHandlers, USER_PROJECTION, UserSchema } from './projection';
import {
  PasswordWasChanged,
  User,
  UserWasCreated,
  UserWasDeleted
} from '../domain';
import {
  ChangePasswordDTO,
  CreateUserDTO,
  DeleteUserDTO
} from '@fixtrack/contracts';
import { UserRedisService } from './service/userRedis.service';
import { UserFinderService, UserMongoFinder } from './service';
import { AuthModule } from '../../auth/auth.module';
import { MailService } from '../../mail.service';
import { USER_FINDER } from '../application/service/user-finder.service';
import { LoggerConfig } from '../../logger';
import { WinstonModule } from 'nest-winston';

const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [
    CqrsModule,
    RedisModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: USER_PROJECTION,
        schema: UserSchema
      }
    ]),
    EventStoreModule.forFeature([User], {
      UserWasCreated: (event: Event<CreateUserDTO>) =>
        new UserWasCreated(
          event.payload._id,
          event.payload.email,
          event.payload.password,
          event.payload.role
        ),
      UserWasDeleted: (event: Event<DeleteUserDTO>) =>
        new UserWasDeleted(event.payload._id),
      PasswordWasChanged: (event: Event<ChangePasswordDTO>) =>
        new PasswordWasChanged(event.payload._id, event.payload.password)
    }),
    WinstonModule.forRoot(logger.console())
  ],
  controllers: [UserController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    ...UserProviders,
    ...ProjectionHandlers,
    UserService,
    RedisModule,
    UserRedisService,
    UserMongoFinder,
    UserFinderService,
    MailService
  ],
  exports: [UserService, MailService, USER_FINDER]
})
export class UserModule {}

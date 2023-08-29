import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';


import { QueryHandlers } from '../application/query';
import { UserProviders } from '../user.providers';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { RedisModule } from '../../redis.service';
import { CommandHandlers } from '../application/command';
import { EventStoreModule, Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { ProjectionHandlers, USER_PROJECTION, UserSchema } from './projection';
import { User, UserWasCreated } from '../domain';
import { CreateUserDTO } from '@fixtrack/contracts';

@Module({
  imports: [
    CqrsModule,
    RedisModule,
    MongooseModule.forFeature([
      {
        name: USER_PROJECTION,
        schema: UserSchema,
      },
    ]),
    EventStoreModule.forFeature([User],{
      UserWasCreatedEvent:(event: Event<CreateUserDTO>) => new UserWasCreated(event.payload.id, event.payload.email, event.payload.password, event.payload.role),
    })
  ],
  controllers: [UserController],
  providers: [ 
    ...QueryHandlers,
    ...CommandHandlers,
    ...UserProviders,
    ...ProjectionHandlers,
    UserService,
    RedisModule,
  ],
  exports: [],
})
export class UserModule {}

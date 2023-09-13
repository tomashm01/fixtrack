import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ConsoleModule } from 'nestjs-console';
import configuration from './conf/configuration';
import { UserModule } from './user';
import { RedisModule } from './redis.service';

import { MongooseModule } from '@nestjs/mongoose';
import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { DeviceModule } from './device';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env'
      ],
      isGlobal: true,
      load: [configuration]
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || '', {}),
    MongooseModule.forRoot(process.env.KEYSTORE_URI, {
      connectionName: process.env.KEYSTORE
    }),
    EventStoreModule.forRoot({
      connection: process.env.EVENTSTORE_URI
    }),
    CqrsModule,
    ConsoleModule,
    UserModule,
    RedisModule,
    DeviceModule
  ]
})
export class BootstrapModule {}

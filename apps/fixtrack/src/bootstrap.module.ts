import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ConsoleModule } from 'nestjs-console';
import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';

import configuration from './conf/configuration';
import { RedisModule } from './redis.service';
import { UserModule } from './user';
import { DeviceModule } from './device';
import { WorkOrderModule } from './work-order';
import { LoggerConfig } from './logger';

const logger: LoggerConfig = new LoggerConfig();

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
    DeviceModule,
    WorkOrderModule,
    WinstonModule.forRoot(logger.console())
  ]
})
export class BootstrapModule {}

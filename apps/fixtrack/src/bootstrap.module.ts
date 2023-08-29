import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ConsoleModule } from 'nestjs-console';
import configuration from './conf/configuration';
import { UserModule } from './user';
import { RedisModule } from './redis.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ],
      isGlobal: true,
      load: [configuration],
    }),
    CqrsModule,
    ConsoleModule,
    UserModule,
    RedisModule,
  ],
})
export class BootstrapModule { }

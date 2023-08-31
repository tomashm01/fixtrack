import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './service/auth.service';
import { JwtStrategy } from './jwt.strategy';


@Module({
  controllers: [],
  exports: [
    AuthService
  ],
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        secret: 'secret',
        signOptions: { expiresIn: '1d' },
      }),
    }),
    PassportModule,
  ],
  providers: [
    AuthService, 
    JwtStrategy,
  ],
})
export class AuthModule {}

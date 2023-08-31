import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { QueryBus } from '@nestjs/cqrs';

import { JwtPayloadInterface, UserDTO } from '@fixtrack/contracts';
import {GetUserByEmailQuery} from '../user/application/query/get-user-by-email.query'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly queryBus: QueryBus
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'yourSecretKey',
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<UserDTO> {
    const user: UserDTO = await this.queryBus.execute(new GetUserByEmailQuery(payload.email));
    
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

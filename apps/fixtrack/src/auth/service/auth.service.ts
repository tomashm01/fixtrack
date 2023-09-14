import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserId } from '../../user/domain';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {}

  async validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateToken(userId: string): Promise<string> {
    return this.jwtService.sign({ userId });
  }

  async validateToken(token: string): Promise<UserId> {
    try {
      const { userId } = this.jwtService.verify(token);
      return UserId.with(userId);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async generateTempToken(
    userId: string,
    expiresIn: string = '24h'
  ): Promise<string> {
    return this.jwtService.sign({ userId }, { expiresIn });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}

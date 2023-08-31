import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateToken(userId: string): Promise<string> {
    return this.jwtService.sign({ userId });
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (e) {
      this.logger.error(`Invalid token: ${e.message}`);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}

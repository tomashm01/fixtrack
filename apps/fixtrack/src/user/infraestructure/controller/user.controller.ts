import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiOkResponse
} from '@nestjs/swagger';

import { UserService } from '../service/user.service';
import {
  CreateUserDTO,
  LoginDTO,
  RoleResponse,
  TokenResponse,
  UserDTO,
  UserDeleteResponse
} from '@fixtrack/contracts';
import {
  IdAlreadyRegisteredError,
  IdNotFoundError
} from '@aulasoftwarelibre/nestjs-eventstore';
import { catchError } from '../../../utils';
import { AuthService } from 'apps/fixtrack/src/auth/service/auth.service';
import { UserId, UserNotFoundError } from '../../domain';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiOkResponse({ type: UserDTO })
  findAll(): Promise<UserDTO[] | null> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por id' })
  @ApiOkResponse({ type: UserDTO })
  async findOne(@Param('id') id: string): Promise<UserDTO | null> {
    try {
      return await this.userService.getUserById(id);
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiBody({ type: CreateUserDTO })
  @ApiOkResponse({ type: UserDTO })
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDTO> {
    try {
      const password: string = await this.authService.hashPassword(
        createUserDto.password
      );
      return await this.userService.createUser({ ...createUserDto, password });
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por id' })
  @ApiOkResponse({ type: UserId })
  async delete(@Param('id') id: string): Promise<UserDeleteResponse> {
    try {
      await this.userService.deleteUser(UserId.with(id));
      return {
        id: id,
        message: 'User deleted'
      };
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<TokenResponse> {
    const { email, password } = loginDTO;

    const user: UserDTO = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Login failed');
    }

    const isValidPassword = await this.authService.validatePassword(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Login failed');
    }

    return new TokenResponse(await this.authService.generateToken(user.id));
  }

  @Post('validate-token')
  async validateToken(@Body() token: TokenResponse): Promise<RoleResponse> {
    const userId: UserId = await this.authService.validateToken(token.token);

    if (!userId) {
      throw new UnauthorizedException('Invalid token');
    }

    return new RoleResponse(
      (await this.userService.getUserById(userId.value)).role
    );
  }
}

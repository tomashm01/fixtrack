import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
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
  ChangePasswordDTO,
  ChangePasswordRequestDTO,
  ChangePasswordResponse,
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
import { MailService } from 'apps/fixtrack/src/mail.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiOkResponse({ type: UserDTO })
  async findAll(): Promise<UserDTO[] | null> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por id' })
  @ApiOkResponse({ type: UserDTO })
  async findOne(@Param('id') id: string): Promise<UserDTO | null> {
    try {
      const user: UserDTO = await this.userService.getUserById(id);
      if (user) this.logger.info(`User was found`, { id: id });
      return user;
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

      const user: UserDTO = await this.userService.createUser({
        ...createUserDto,
        password
      });

      await this.mailService.sendEmail(
        createUserDto.email,
        'Bienvenido a FixTrack',
        `<h1>Bienvenido a FixTrack</h1>
        <p>Gracias por registrarte en FixTrack</p>
          <div>
            <p> Tus contraseña generada aleatoriamente es esta: </p>
            <p> ${createUserDto.password} </p>
          </div>
        <p>Cambia tu contraseña al iniciar sesión con el siguiente enlace:</p>
        <a href="http://localhost:4200/login">Clickeame</a>
        <p>Si no has creado una cuenta en FixTrack, ignora este correo.</p>
        <p>Saludos,</p>
        <p>El equipo de FixTrack</p>
        `
      );

      return user;
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
  @ApiOperation({ summary: 'Validar el token del usuario' })
  @ApiBody({ type: TokenResponse })
  async validateToken(@Body() token: TokenResponse): Promise<RoleResponse> {
    const userId: UserId = await this.authService.validateToken(token.token);

    if (!userId) {
      throw new UnauthorizedException('Invalid token');
    }

    return new RoleResponse(
      (await this.userService.getUserById(userId.value)).role,
      userId.value
    );
  }

  @Post('change-password')
  @ApiOperation({ summary: 'Cambiar la contraseña del usuario' })
  @ApiOkResponse({ type: ChangePasswordRequestDTO })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordRequestDTO
  ): Promise<ChangePasswordResponse> {
    const { token, password, newpassword } = changePasswordDto;
    try {
      const userId: UserId = await this.authService.validateToken(token);
      const user: UserDTO = await this.userService.getUserById(userId.value);
      const isValidPassword = await this.authService.validatePassword(
        password,
        user.password
      );

      if (!isValidPassword) {
        throw new ForbiddenException('Contraseña incorrecta');
      }

      const newHashedPassword = await this.authService.hashPassword(
        newpassword
      );
      await this.userService.updateUserPassword(userId, newHashedPassword);
    } catch (e) {
      if (e instanceof ForbiddenException) {
        throw e;
      } else {
        throw new UnauthorizedException(e.message);
      }
    }
    return {
      token: token,
      message: 'Contraseña cambiada correctamente'
    };
  }
}

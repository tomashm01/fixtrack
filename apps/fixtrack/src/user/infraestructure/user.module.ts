import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './controller/user.controller';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {
  static forRoot(): DynamicModule {
    return {
      module: UserModule,
      controllers: [UserController],
      providers: [],
    };
  }
}

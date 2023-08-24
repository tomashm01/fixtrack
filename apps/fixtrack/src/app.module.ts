import { Module, DynamicModule, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppLoggerMiddleware } from './app.middleware';
import { UserModule } from './user';

@Module({
  imports: [UserModule.forRoot()],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

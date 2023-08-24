import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Fixtrack API')
    .setVersion('1.0')
    .addTag('My API tag')
    .build();
  
  app.enableCors();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`📖 Swagger API documentation is running on: http://localhost:${port}/${globalPrefix}/docs`);
}

bootstrap();
